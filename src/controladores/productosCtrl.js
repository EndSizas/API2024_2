import {conmysql} from '../db.js'
import{ v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dqxjdfncz',
    api_key: '972776657996249',
    api_secret: '5F2PB9yT5_xycNG_vKyegoOoMc8'
})


export const getProductos=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from productos ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar productos"})
        }
    }

export const getproductosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from productos where prod_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Producto no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}

export const postProducto = async (req, res) => {
    try {
      const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
      console.log("Datos del producto:", req.body);
  
      let prod_imagen = null;
  
      // Verifica si se subió una imagen y la sube a Cloudinary
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'uploads',
          public_id: `${Date.now()}-${req.file.originalname}`
        });
        prod_imagen = uploadResult.secure_url;
      }
  
      // Prepara los datos para insertar en la base de datos
      const productoData = [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen];
      console.log("Guardando producto en la base de datos:", productoData);
  
      // Inserta el producto en la base de datos
      const [rows] = await connmysql.query(
        'INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)',
        productoData
      );
  
      // Responde con el id del producto insertado y la URL de la imagen
      res.status(201).json({
        mensaje: 'Producto guardado correctamente.',
        prod_id: rows.insertId,
        prod_imagen
      });
    } catch (error) {
      console.log("Error en postProducto:", error);
      res.status(500).json({ message: 'Error del lado del servidor' });
    }
  };
  
  export const putProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
  
      console.log("ID del producto a actualizar:", id);
      console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);
  
      let prod_imagen = null; // Variable para almacenar la URL de la imagen
  
      // Verifica si se subió una nueva imagen y la sube a Cloudinary
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'uploads',
          public_id: `${Date.now()}-${req.file.originalname}`
        });
        prod_imagen = uploadResult.secure_url;
      }
  
      // Prepara la consulta SQL y los valores de acuerdo a la disponibilidad de prod_imagen
      const query = prod_imagen
        ? 'UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=? WHERE prod_id=?'
        : 'UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=? WHERE prod_id=?';
  
      const values = prod_imagen
        ? [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        : [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, id];
  
      // Ejecuta la consulta de actualización
      const [result] = await connmysql.query(query, values);
      console.log("Resultado de la actualización:", result);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Recupera el producto actualizado de la base de datos
      const [rows] = await connmysql.query('SELECT * FROM productos WHERE prod_id=?', [id]);
      console.log("Datos del producto después de la actualización:", rows[0]);
  
      res.json(rows[0]);
    } catch (error) {
      console.error("Error en putProducto:", error);
      res.status(500).json({ message: 'Error del lado del servidor' });
    }
  };
  
export const patchProducto=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo}=req.body
        // Obtener la nueva imagen si se envía; si no, se conserva la actual
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;
        console.log("Datos del producto:", req.body);
        console.log("Archivo de imagen:", req.file);
        //console.log(prod_nombre)
        const [result]=await conmysql.query('update productos set prod_codigo=IFNULL(?,prod_codigo), prod_nombre=IFNULL(?,prod_nombre), prod_stock=IFNULL(?,prod_stock), prod_precio=IFNULL(?,prod_precio), prod_activo=IFNULL(?,prod_activo), prod_imagen=IFNULL(?,prod_imagen) where prod_id=?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Producto no encontrado'
        })
        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteProducto=
async(req, res)=>{
    try {
        const [rows]=await conmysql.query('delete from productos where prod_id=?',[req.params.id])
        if (rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar el producto"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({
            message:error
        
        })
    }
}