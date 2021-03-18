const express = require('express');
const bodyParser = require('body-parser')
const sync = require('async')
const app = express();

//const misrutas = require('./routes/rutas');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//// cabeceras
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const mysql = require('mysql');
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'usuariovero',
  password: '190398',
/*
  password: '123',
  user: 'usuariovero',
  password: '190398',
  database: "teempla",
*/
  database: 'templaexpress'
});
//-------------login-------------------------
app.get('/user',(req,res)=>{
  console.log(req.query);
  var username=[req.query.username];
  var contra =[req.query.contra];
  connect.query("select puesto, nombre_usuario, contrasena from empleados where nombre_usuario=? and contrasena=?", [username, contra],(err,result)=>{
      if(err){
         throw err;
      }else{
        console.log(result);
        res.send(result);
        res.end();
      }
});
})
//-------------clientes---------------
//selecciona a todos los clientes1 
//lista
app.get('/clientes', (req, res) => {
  connect.query("select * from clientes", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });

})
//reporte telefonos
//lista
app.get('/telefono', (req, res) => {
  connect.query("select nombre,telefono from clientes", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });

})
////nuevo cliente2
//lista
app.get('/newclient', (req, res) => {
  console.log(req.query);
  var nombre = [req.query.nombre];
  var apepat = [req.query.apepat];
  var apemat = [req.query.apemat];
  var telefono = [req.query.telefono];
  var rfc = [req.query.rfc];
  var tipo = [req.query.tipo];
  var correo = [req.query.correo];
  var calle = [req.query.calle];
  var numint = [req.query.numint];
  var numext = [req.query.numext];
  var colonia = [req.query.colonia];
  var cp = [req.query.cp];
  var ciudad = [req.query.ciudad];
  var estado = [req.query.estado];
  var pais = [req.query.pais];
  //console.log(id);
  //console.log(req.params('nombre'));
  const query = `insert into codigo_postal (cp,ciudad,estado,pais) values ('${cp}',"${ciudad}","${estado}","${pais}")`;
  connect.query(query, (err, result) => {
    if (err) {
      //  throw err;
    } else {
      // res.send(result);
      //res.end();
    }
    const query1 = `select * from codigo_postal where cp='${cp}'`;
    connect.query(query1, (err, result1) => {
      if (err) {
        //  throw err;
      } else {
        //res.send(result1);
        //  res.end();
      }
      var cp1 = result1[0].id_cp;
      const query2 = `insert into direccion (calle,num_int,num_ext,colonia,cp) values ("${calle}","${numint}","${numext}","${colonia}",'${cp1}')`;
      connect.query(query2, (err, result2) => {
        if (err) {
          // throw err;
        } else {
          //s.send(result2);
          //>res.end();
        }
        const query3 = `select * from direccion where cp='${cp1}'`;
        connect.query(query3, (err, result3) => {
          if (err) {
            // throw err;
          } else {
            //s.send(result2);
            //>res.end();
          }
          var direccion = result3[0].id_direccion;
          const query4 = `insert into clientes (nombre,ape_pat,ape_mat,telefono,rfc,tipo,correo,id_direccion) values ("${nombre}","${apepat}","${apemat}",'${telefono}',"${rfc}",'${tipo}',"${correo}",'${direccion}')`;
          connect.query(query4, (err, result4) => {
            if (err) {
              // throw err;
            } else {
              res.send(result4);
              res.end();
            }

          });
        });
      });
    });

  });
})
//borrar un cliente3
//lista
app.get('/deletclient', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  var direccion;
  var cp;
  const query1 = `select * from clientes where id_cliente='${id}'`;
  connect.query(query1, (err, result) => {
    if (err) {
      //throw err;
    } else {
      // res.send(result);
      //res.end();
    }
    direccion = result[0].id_direccion;
    console.log(direccion);
    const query2 = `select * from direccion where id_direccion='${direccion}'`;
    connect.query(query2, (err, result2) => {
      if (err) {
        //throw err;
      } else {
        //res.send(result2);
        //res.end();
      }
      cp = result2[0].cp;
      // console.log(result2);
      const query3 = `select * from codigo_postal where id_cp='${cp}'`;
      connect.query(query3, (err, result3) => {
        if (err) {
          //throw err;
        } else {
          //res.send(result3);
          //res.end();
        }
        console.log(result3);
        console.log(id);
        console.log(direccion);
        console.log(cp);
        const query3 = `delete  from direccion where id_direccion='${direccion}'`;
        connect.query(query3, (err, result3) => {
          if (err) {
            // throw err;
          } else {
            // res.send(result2);
            //res.end();
          }
          const query3 = `delete  from codigo_postal where id_cp='${cp}'`;
          connect.query(query3, (err, result3) => {
            if (err) {
            } else {
              // res.send(result2);
              //res.end();
            }
            const query5 = `delete from clientes where id_cliente='${id}'`;
            connect.query(query5, (err, result5) => {
              if (err) {
                throw err;
              } else {
                res.send(result5);
                res.end();
              }
            })
          })
        })
      })
    })
  })
})
/// tomar un cliente4
//lista
app.get('/client', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = (`select a.nombre, a.ape_pat,a.ape_mat,a.telefono,a.rfc,a.tipo,a.correo,b.calle,b.num_int,b.num_ext,b.colonia,c.cp,c.ciudad,c.estado,c.pais from clientes a, direccion b, codigo_postal c where a.id_direccion=b.id_direccion and b.cp=c.id_cp and a.id_cliente='${id}' order by a.nombre;`);
  connect.query(query, (err, result) => {
    if (err) {

    } else {
      res.send(result);
      // res.status(200).json(result);
      res.end();
    }
  });
})

//editar un cliente5
app.get('/updateclient', (req, res) => {
  // console.log(req.query.cliente);
  var id = [req.query.id];
  var nombre = [req.query.nombre];
  var apepat = [req.query.apepat];
  var apemat = [req.query.apemat];
  var telefono = [req.query.telefono];
  var rfc = [req.query.rfc];
  var tipo = [req.query.tipo];
  var correo = [req.query.correo];
  var calle = [req.query.calle];
  var numint = [req.query.numint];
  var numext = [req.query.numext];
  var colonia = [req.query.colonia];
  var cp = [req.query.cp];
  var ciudad = [req.query.ciudad];
  var estado = [req.query.estado];
  var pais = [req.query.pais];
  console.log(apepat);
  console.log(id);
  const query = `update clientes set nombre="${nombre}",ape_pat="${apepat}",ape_mat="${apemat}",telefono='${telefono}',rfc="${rfc}",tipo='${tipo}',correo="${correo}" where id_cliente='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      //throw err;
    } else {
      //res.send(result);
      //res.end();
    }
    const query1 = `select * from clientes where id_cliente='${id}'`;
    connect.query(query1, (err, result1) => {
      if (err) {
        // throw err;
      } else {
        //res.send(result);
        // res.end();
      var direccion = result1[0].id_direccion;
      console.log(direccion)
      const query2 = `update direccion set calle="${calle}",num_int="${numint}",num_ext="${numext}",colonia="${colonia}" where id_direccion='${direccion}'`;
      connect.query(query2, (err, result2) => {
        if (err) {
          // throw err;
        } else {
          //res.send(result);
          // res.end();
        }
        const query3 = `select * from direccion where id_direccion='${direccion}'`;
        connect.query(query3, (err, result3) => {
          if (err) {
            // throw err;
          } else {
            //res.send(result);
            // res.end();
          }
          var cp1 = result3[0].cp;
          const query4 = `update codigo_postal set cp='${cp}',ciudad="${ciudad}",estado="${estado}",pais="${pais}" where id_cp='${cp1}'`;
          connect.query(query4, (err, result3) => {
            if (err) {
              // throw err;
            } else {
              //res.send(result);
              // res.end();
            }
          });
        });
      });
      }
    });
  });
})
///------------------------------empleados---------------------------
///mostrar empleados1
//lista
app.get('/empleados', (req, res) => {

  const query = "select * from empleados";
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//un empleado
//lista
app.get('/empleado', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);

  const query = `select a.nombre,a.ape_pat,a.ape_mat , a.telefono,a.puesto,a.nombre_usuario,a.contrasena,b.calle,b.num_int,b.num_ext,b.colonia,c.cp,c.ciudad,c.estado,c.pais from empleados a, direccion b, codigo_postal c where a.id_direccion=b.id_direccion and b.cp=c.id_cp and a.id_empleado='${id}' order by a.nombre;`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

////agregar un empleado2
app.get('/newempleado', async (req, res) => {
  console.log(req.query);
  var nombre = [req.query.nombre];
  var apepat = [req.query.apepat];
  var apemat = [req.query.apemat];
  var telefono = [req.query.telefono];
  var puesto = [req.query.puesto];
  var nombreu = [req.query.nombreu];
  var contra = [req.query.contra]
  var calle = [req.query.calle];
  var numint = [req.query.numint];
  var numext = [req.query.numext];
  var colonia = [req.query.colonia];
  var cp = [req.query.cp];
  var ciudad = [req.query.ciudad];
  var estado = [req.query.estado];
  var pais = [req.query.pais];

  const query = `insert into codigo_postal (cp,ciudad,estado,pais) values ('${cp}',"${ciudad}","${estado}","${pais}")`;
  connect.query(query, (err, result) => {
    if (err) {
      // throw err;
    } else {
      // res.send(result);
      //  res.end();
    }
    const query1 = `select * from codigo_postal where cp='${cp}'`;
    connect.query(query1, (err, result1) => {
      if (err) {
        //  throw err;
      } else {
        // res.send(result);
        // res.end();
      }
      var cp1 = result1[0].id_cp;
      const query2 = `insert into direccion (calle,num_int,num_ext,colonia,cp) values ("${calle}","${numint}","${numext}","${colonia}",'${cp1}')`;
      connect.query(query2, (err, result2) => {
        if (err) {
          //   throw err;
        } else {
          //  res.send(result);
          // res.end();

        }
        const query3 = `select * from direccion where cp='${cp1}'`;
        connect.query(query3, (err, result3) => {
          if (err) {
            //  throw err;
          } else {
            // res.send(result);
            //  res.end();

          }
          var direccion = result3[0].id_direccion;
          const query4 = `insert into empleados (nombre,ape_pat,ape_mat,telefono,puesto,nombre_usuario,contrasena,id_direccion) values ("${nombre}","${apepat}","${apemat}",'${telefono}','${puesto}',"${nombreu}","${contra}",'${direccion}')`;
          connect.query(query4, (err, result4) => {
            if (err) {
              // throw err;
            } else {
              res.send(result4);
              res.end();

            }
          });
        });
      });
    });
  });
})
//borrar un empleado3
//lista
app.get('/dempleado', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);

  const query1 = `select * from empleados where id_empleado='${id}'`;
  connect.query(query1, (err, result1) => {
    if (err) {
      //throw err;
    } else {
      // res.send(result);
      // res.end();
    }
    var direccion = result1[0].id_direccion;
    const query2 = `select * from direccion where id_direccion='${direccion}'`;
    connect.query(query2, (err, result2) => {
      if (err) {
        //  throw err;
      } else {
        // res.send(result);
        //  res.end();
      }
      var cp = result2[0].cp;
      const query3 = `select * from codigo_postal where id_cp='${cp}'`;
      connect.query(query3, (err, result3) => {
        if (err) {
          // throw err;
        } else {
          // res.send(result);
          // res.end();
        }

        const query4 = `delete  from direccion where id_direccion='${direccion}'`;
        connect.query(query4, (err, result4) => {
          if (err) {
            // throw err;
          } else {
            //res.send(result);
            //res.end();
          }
          const query5 = `delete  from codigo_postal where id_cp='${cp}'`;
          connect.query(query5, (err, result5) => {
            if (err) {
              // throw err;
            } else {
              //  res.send(result);
              // res.end();
            }
            const query6 = `delete from empleados where id_empleado='${id}'`;
            connect.query(query6, (err, result6) => {
              if (err) {
                //throw err;
              } else {
                res.send(result6);
                res.end();
              }


            });
          });
        });
      });
    });
  });



})
app.get('/updateempleado',(req,res)=>{
  console.log(req.query);
  var id=[req.query.id];
  var nombre =[req.query.nombre];
  var apepat =[req.query.apepat];
  var apemat =[req.query.apemat];
  var telefono =[req.query.telefono];
  var puesto =[req.query.puesto];
  var nombreu =[req.query.nombreu];
  var contra =[req.query.contra]
  var calle =[req.query.calle];
  var numint =[req.query.numint];
  var numext =[req.query.numext];
  var colonia =[req.query.colonia];
  var cp =[req.query.cp];
  var ciudad =[req.query.ciudad];
  var estado =[req.query.estado];
  var pais =[req.query.pais];
  const query = `update empleados set nombre="${nombre}",ape_pat="${apepat}",ape_mat="${apemat}",telefono='${telefono}',puesto="${puesto}",nombre_usuario="${nombreu}",contrasena="${contra}" where id_empleado='${id}'`;
  connect.query(query,(err,result)=>{
          if(err){
            // throw err;
          }else{
            //res.send(result);
            //res.end();
          }
          const query1 = `select * from empleados where id_empleado='${id}'`;
          connect.query(query1,(err,result1)=>{
                  if(err){
                     //throw err;
                  }else{
                    //res.send(result);
                    //res.end();
                  }
                  var direccion = result1[0].id_direccion;
                  const query2 = `update direccion set calle="${calle}",num_int="${numint}",num_ext="${numext}",colonia="${colonia}" where id_direccion='${direccion}'`;
                  connect.query(query2,(err,result2)=>{
                          if(err){
                            // throw err;
                          }else{
                           // res.send(result);
                            //res.end();
                          }
                          const query3 = `select * from direccion where id_direccion='${direccion}'`;
                          connect.query(query3,(err,result3)=>{
                                  if(err){
                                    // throw err;
                                  }else{
                                   // res.send(result);
                                   // res.end();
                                  }
                                  var cp1 = result3[0].cp;
                                  const query4 = `update codigo_postal set cp='${cp}',ciudad="${ciudad}",estado="${estado}",pais="${pais}" where id_cp='${cp1}'`;
                                  connect.query(query4,(err,result4)=>{
                                          if(err){
                                             throw err;
                                          }else{
                                            res.send(result);
                                            res.end();
                                          }   
      
});
  
});

});

});

});
})



//------------------------------------proveedores----------------------------------------
//ver proveedores
//lista
app.get('/proveedores', async (req, res) => {

  const query = "select * from proveedores ";
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//ver un proveedor
//lista
app.get('/proveedor', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = `select a.nombre,a.ape_pat,a.ape_mat, a.correo,a.telefono,a.rfc,a.tipo,b.calle,b.num_int,b.num_ext,b.colonia,c.cp,c.ciudad,c.estado,c.pais from proveedores a, direccion b, codigo_postal c where a.id_direccion=b.id_direccion and b.cp=c.id_cp and a.id_proveedor='${id}' order by a.nombre;`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//borrar un proveedor
//lista
app.get('/dproveedor', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  var direccion;
  var cp;
  const query1 = `select * from proveedores where id_proveedor='${id}'`;
  connect.query(query1, (err, result) => {
    if (err) {
      //throw err;
    } else {
      // res.send(result);
      //res.end();
    }
    direccion = result[0].id_direccion;
    console.log(direccion);
    const query2 = `select * from direccion where id_direccion='${direccion}'`;
    connect.query(query2, (err, result2) => {
      if (err) {
        //throw err;
      } else {
        //res.send(result2);
        //res.end();
      }
      cp = result2[0].cp;
      // console.log(result2);
      const query3 = `select * from codigo_postal where id_cp='${cp}'`;
      connect.query(query3, (err, result3) => {
        if (err) {
          //throw err;
        } else {
          //res.send(result3);
          //res.end();
        }
        console.log(result3);
        console.log(id);
        console.log(direccion);
        console.log(cp);
        const query3 = `delete  from direccion where id_direccion='${direccion}'`;
        connect.query(query3, (err, result3) => {
          if (err) {
            // throw err;
          } else {
            // res.send(result2);
            //res.end();
          }
          const query3 = `delete  from codigo_postal where id_cp='${cp}'`;
          connect.query(query3, (err, result3) => {
            if (err) {
            } else {
              // res.send(result2);
              //res.end();
            }
            const query5 = `delete from proveedores where id_proveedor='${id}'`;
            connect.query(query5, (err, result5) => {
              if (err) {
                throw err;
              } else {
                res.send(result5);
                res.end();
              }
            })
          })
        })
      })
    })
  })
});
//editar un provedor
app.get('/updateproveedor', async (req, res) => {
  var id = [req.query.id];
  var nombre = [req.query.nombre];
  var apepat = [req.query.apepat];
  var apemat = [req.query.apemat];
  var telefono = [req.query.telefono];
  var rfc = [req.query.rfc];
  var tipo = [req.query.tipo];
  var correo = [req.query.correo];
  var calle = [req.query.calle];
  var numint = [req.query.numint];
  var numext = [req.query.numext];
  var colonia = [req.query.colonia];
  var cp = [req.query.cp];
  var ciudad = [req.query.ciudad];
  var estado = [req.query.estado];
  var pais = [req.query.pais];
  console.log(apepat);
  console.log(id);
  const query = `update proveedores set nombre="${nombre}",ape_pat="${apepat}",ape_mat="${apemat}",telefono='${telefono}',rfc="${rfc}",tipo='${tipo}',correo="${correo}" where id_proveedor='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      //throw err;
    } else {
      //res.send(result);
      //res.end();
    const query1 = `select * from proveedores where id_proveedor='${id}'`;
    connect.query(query1, (err, result1) => {
      if (err) {
        // throw err;
      } else {
        //res.send(result);
        // res.end();
        var direccion = result1[0].id_direccion;
        console.log(direccion)
        const query2 = `update direccion set calle="${calle}",num_int="${numint}",num_ext="${numext}",colonia="${colonia}" where id_direccion='${direccion}'`;
        connect.query(query2, (err, result2) => {
          if (err) {
            // throw err;
          } else {
            //res.send(result);
            // res.end();
          const query3 = `select * from direccion where id_direccion='${direccion}'`;
          connect.query(query3, (err, result3) => {
            if (err) {
              // throw err;
            } else {
              //res.send(result);
              // res.end();
              var direccion = result1[0].id_direccion;
              console.log(direccion)
              const query2 = `update direccion set calle="${calle}",num_int="${numint}",num_ext="${numext}",colonia="${colonia}" where id_direccion='${direccion}'`;
              connect.query(query2, (err, result2) => {
              if (err) {
                // throw err;
              } else {
                //res.send(result);
                // res.end();
                const query3 = `select * from direccion where id_direccion='${direccion}'`;
                connect.query(query3, (err, result3) => {
                if (err) {
                  // throw err;
                } else {
                  //res.send(result);
                  // res.end();
                  var cp1 = result3[0].cp;
                  const query4 = `update codigo_postal set cp='${cp}',ciudad="${ciudad}",estado="${estado}",pais="${pais}" where id_cp='${cp1}'`;
                  connect.query(query4, (err, result3) => {
                    if (err) {
                      // throw err;
                    } else {
                      //res.send(result);
                      // res.end();
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}
    });
    }
  });
})
//agregar un nuevo proveedor
//lista
app.get('/newproveedor', async (req, res) => {
  console.log(req.query);
  var nombre = [req.query.nombre];
  var apepat = [req.query.apepat];
  var apemat = [req.query.apemat];
  var telefono = [req.query.telefono];
  var rfc = [req.query.rfc];
  var tipo = [req.query.tipo];
  var correo = [req.query.correo];
  var calle = [req.query.calle];
  var numint = [req.query.numint];
  var numext = [req.query.numext];
  var colonia = [req.query.colonia];
  var cp = [req.query.cp];
  var ciudad = [req.query.ciudad];
  var estado = [req.query.estado];
  var pais = [req.query.pais];
  //console.log(id);
  //console.log(req.params('nombre'));
  const query = `insert into codigo_postal (cp,ciudad,estado,pais) values ('${cp}',"${ciudad}","${estado}","${pais}")`;
  connect.query(query, (err, result) => {
    if (err) {
      //  throw err;
    } else {
      // res.send(result);
      //res.end();
    }
    const query1 = `select * from codigo_postal where cp='${cp}'`;
    connect.query(query1, (err, result1) => {
      if (err) {
        //  throw err;
      } else {
        //res.send(result1);
        //  res.end();
      }
      var cp1 = result1[0].id_cp;
      const query2 = `insert into direccion (calle,num_int,num_ext,colonia,cp) values ("${calle}","${numint}","${numext}","${colonia}",'${cp1}')`;
      connect.query(query2, (err, result2) => {
        if (err) {
          // throw err;
        } else {
          //s.send(result2);
          //>res.end();
        }
        const query3 = `select * from direccion where cp='${cp1}'`;
        connect.query(query3, (err, result3) => {
          if (err) {
            // throw err;
          } else {
            //s.send(result2);
            //>res.end();
          }
          var direccion = result3[0].id_direccion;
          const query4 = `insert into proveedores (nombre,ape_pat,ape_mat,telefono,rfc,tipo,correo,id_direccion) values ("${nombre}","${apepat}","${apemat}",'${telefono}',"${rfc}",'${tipo}',"${correo}",'${direccion}')`;
          connect.query(query4, (err, result4) => {
            if (err) {
              // throw err;
            } else {
              res.send(result4);
              res.end();
            }

          });
        });
      });
    });

  });

})

//---------------------ver inventario------------------
//lista
app.get('/inventario', (req, res) => {
  const query = " select * from inventario";
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });

})
//ver un producto
//lista
app.get('/producto', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = `select * from inventario where id_inventario="${id}" `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//editar un producto
//lista
app.get('/upadateproducto', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  var id_herraje = [req.query.id_herraje];
  var nombre = [req.query.nombre];
  var marca = [req.query.marca];
  var cvidrio = [req.query.cvidrio];
  var svidrio = [req.query.svidrio];
  var existencias = [req.query.existencias];
  var min = [req.query.min];
  console.log(id);

  const query = `update inventario set id_inventario="${id}", id_herraje="${id_herraje}", nombre="${nombre}", marca="${marca}", preciocvidrio='${cvidrio}',preciosvidrio='${svidrio}', existencias='${existencias}', min='${min}' where id_inventario="${id}" `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//eliminar un producto
//lista
app.get('/dproducto', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];

  const query = `delete from inventario  where id_herraje="${id}" `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//nuevo producto
//lista
app.get('/newproducto', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  var nombre = [req.query.nombre];
  var marca = [req.query.marca];
  var cvidrio = [req.query.cvidrio];
  var svidrio = [req.query.svidrio];
  var existencias = [req.query.existencias];
  var min = [req.query.min];
  console.log(id);
  const query = ` insert into inventario (id_herraje,nombre,marca,preciocvidrio,preciosvidrio,existencias,min) values ("${id}","${nombre}","${marca}",'${cvidrio}','${svidrio}','${existencias}','${min}')`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//--------------------lista de precios----------------------
///ver lista de precios
//lista
app.get('/precios', (req, res) => {
  const query = 'select a.id_listaprecios, a.id_herraje,(b.nombre)as nom_herraje, c.nombre, c.ape_pat, c.ape_mat, b.marca, a.precio_compra from lista_precios a, inventario b, proveedores c where a.id_herraje=b.id_herraje and a.id_proveedor=c.id_proveedor;';
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//ver un precio
//lista
app.get('/precio', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = `select a.id_listaprecios, a.id_herraje,(b.nombre)as nom_herraje, b.marca, a.precio_compra, c.nombre, c.ape_pat, c.ape_mat, a.id_proveedor from lista_precios a, inventario b, proveedores c where a.id_herraje=b.id_herraje and a.id_proveedor=c.id_proveedor and a.id_listaprecios='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//editar un precio
//lista
app.get('/upadateprecio', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  var id1 = [req.query.id1];
  var precio = [req.query.precio];
  console.log(id);
  console.log(id1);
  console.log(precio);
  const query = `update lista_precios set precio_compra='${precio}' where id_herraje='${id}' and id_proveedor='${id1}' `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//eliminar un precio
//lista
app.get('/dprecio', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  var id1 = [req.query.id1];
  const query = `delete from lista_precios where id_herraje='${id}' and id_proveedor='${id1}' `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//nuevo precio
//lista
app.get('/newwprecio', (req, res) => {
var id = [req.query.id];
var precio = [req.query.precio];
var id1 = [req.query.id1];
console.log(id);
console.log(id1);
console.log(precio);
const query = `insert into lista_precios (id_herraje,precio_compra,id_proveedor) values ("${id}",'${precio}','${id1}') `;
connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//--------------------Faltantes----------------------
///ver lista de faltantes
//lista
app.get('/faltantes', (req, res) => {
  const query = 'select id_faltantes, fecha from faltantes group by id_faltantes order by id_faltantes;';
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//ver una lista de faltantes
//lista
app.get('/faltante', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = `select a.id_producto, a.id_faltantes, a.fecha, a.id_herraje, a.cantidad, a.id_proveedor, c.nombre, b.marca, (b.nombre)as nom_herraje, c.ape_pat, c.ape_mat from faltantes a, inventario b, proveedores c where a.id_herraje=b.id_herraje and a.id_proveedor=c.id_proveedor and a.id_faltantes='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//-----Nueva lista faltantes
app.get('/newfaltantes', (req, res) => {
  var id = [req.query.id];
  var id1 = [req.query.id1];
  var id2 = [req.query.id2];
  var cantidad = [req.query.cantidad];
  var fecha = [req.query.fecha];
  var nombre_proveedor = [req.query.nombre_proveedor];
  const query = `insert into faltantes (id_faltantes,id_herraje,id_proveedor,fecha,cantidad) values ('${id}',"${id1}",'${id2}','${fecha}','${cantidad}') `;
  connect.query(query, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result); 
        res.end();
      }
    });
  })

  //eliminar una lista faltante
//lista
app.get('/dfaltante', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  const query = `delete from faltantes where id_faltantes='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

  //eliminar un producto de lista
//lista
app.get('/dprod', (req, res) => {
  var id1 = [req.query.id1];
  const query = `delete from faltantes where id_producto='${id1}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//----------Gananacias--------------
///ver ganancias
app.get('/ganancias', (req, res) => {
  const query = 'select a.id_ganancias, a.num_nota,a.tipo_pago,a.cantidad,a.id_cliente,a.concepto,a.status,a.recibio, a.fecha, b.nombre,b.ape_pat,b.ape_mat from ganancias a, clientes b where a.id_cliente=b.id_cliente;';
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//Nueva registro gananacias
app.get('/newganancias', (req, res) => {
  var id = [req.query.id];
  var num_nota = [req.query.num_nota];
  var tipo_pago = [req.query.tipo_pago];
  var cantidad = [req.query.cantidad];
  var concepto = [req.query.concepto];
  var status = [req.query.status];
  var recibio = [req.query.recibio];
  var id1 = [req.query.id1];
  var fecha = [req.query.fecha]
  const query = `insert into ganancias(num_nota,tipo_pago,cantidad,concepto,status,recibio, fecha, id_cliente) values ('${num_nota}',"${tipo_pago}",'${cantidad}',"${concepto}","${status}","${recibio}", "${fecha}", '${id1}') `;
  connect.query(query, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result); 
        res.end();
      }
    });
  })
//ver una ganancia
app.get('/ganancia', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = `select a.num_nota,a.tipo_pago,a.cantidad,a.id_cliente,a.concepto,a.status,a.recibio,a.fecha, b.nombre,b.ape_pat,b.ape_mat from ganancias a, clientes b where a.id_cliente=b.id_cliente and a.id_ganancias='${id}' `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//editar un registro de ganancia
app.get('/upadateganancia', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  var num_nota = [req.query.num_nota];
  var tipo_pago = [req.query.tipo_pago];
  var cantidad = [req.query.cantidad];
  var concepto = [req.query.concepto];
  var status = [req.query.status];
  var recibio = [req.query.recibio];
  var fecha = [req.query.fecha];
  var id_cliente = [req.query.id_cliente];
  console.log(id);

  const query = `update ganancias set id_ganancias='${id}', num_nota='${num_nota}', tipo_pago="${tipo_pago}", cantidad='${cantidad}', concepto="${concepto}",status="${status}", recibio="${recibio}", id_cliente='${id_cliente}', fecha='${fecha}' where id_ganancias='${id}' `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//eliminar un registro
app.get('/dganancia', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];

  const query = `delete from ganancias  where id_ganancias="${id}" `;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

/*Conseguir ganancias de un dia*/

app.get('/gananciasdiarias', async (req, res) => {
  console.log(req.query);
  var fecha = [req.query.id];
  const query = `select sum(cantidad) as diario from ganancias where fecha='${fecha}';`;
  console.log(query);
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end;
    }
  })
})

//-----------Reportes----------------
app.get('/getsemanal', async (req, res) => {
 var f_rep = req.query.f_rep;
 console.log("holaaa");
  console.log(req.query);
  console.log(f_rep);
 const query = `call Pvs("${f_rep}");`;
  connect.query(query, (err, result) => {
    if (err) {
      //throw err;
    } else {
      res.send(result);
      res.end();
     
    }
    console.log(result);
  })

})
app.get('/getmensual', async (req, res) => {
  var f_rep = req.query.f_rep;
  connect.query(`call Pvm();`, (err, result) => {
    //console.log(result);
    if (err) {
      //throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
app.get('/getanual', async (req, res) => {
  var f_rep = req.query.f_rep;
  connect.query(`call Pva();`, (err, result) => {
    //console.log(result);
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
app.get('/masvendido', async (req, res) => {
  connect.query(`select sum(a.cantidad)as mas, a.id_herraje, b.nombre,b.marca from pedido a, inventario b where a.id_herraje=b.id_herraje group by a.id_herraje order by mas desc limit 10;`, (err, result) => {
    //console.log(result);
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
app.get('/maspedido', async (req, res) => {
  connect.query(`select sum(a.cantidad) as mas, a.id_herraje, b.nombre, b.marca from faltantes a, inventario b where a.id_herraje=b.id_herraje group by b.nombre order by mas desc limit 10;`, (err, result) => {
    //console.log(result);
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
app.get('/mascaro', async (req, res) => {
  connect.query(`call Pc();`, (err, result) => {
    // console.log(result);
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

app.get('/clientemascompras', async (req, res) => {
  connect.query(`select a.nombre, a.ape_pat, a.ape_mat, sum(b.total)as vendido from clientes a, ventas b where a.id_cliente=b.id_cliente group by a.id_cliente order by vendido desc limit 50;`, (err, result) => {
    //console.log(result);
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//---------------Ventas------------------
//MOSTRAR VENTAS
app.get('/ventas', (req, res) => {
  connect.query("select a.id_ventas, a.fecha, b.nombre, b.ape_pat, b.ape_mat from ventas a, clientes b where a.id_cliente=b.id_cliente;", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//MOSTRAR 1 SOLA VENTA
app.get('/vent', (req, res) => {
  var id = [req.query.id];
  const query = `select * from ventas where id_ventas='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
app.get('/pedidos', async (req, res) => {

  const query = "select * from pedido ";
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//API agregar nuevo pedido
app.get('/newpedido', (req, res) => {
  console.log(req.query);
  var id_herraje = [req.query.id_herraje];
  var cantidad = [req.query.cantidad];
  var precio_unitario = [req.query.precio_unitario];
  var tipo_precio = [req.query.tipo_precio];
  const query = `insert into pedido (id_herraje,cantidad,precio_unitario,tipo_precio) values ('${id_herraje}','${cantidad}','${precio_unitario}','${tipo_precio}')`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
  //res.send({es: 'aa'});
});
app.get('/getIdPedido', (req, res) => {

  const query = (`SELECT LAST_INSERT_ID();`);
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
});
//API mostrar solo un pedido
app.get('/pedido', (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = (`select a.id_pedido,a.id_herraje, a.cantidad, a.precio_unitario,a.tipo_precio,b.nombre, b.marca from  pedido a, inventario b where id_ventas='${id}' and a.id_herraje=b.id_herraje;`);
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//----API AGREGAR VENTA
app.post('/addventa', (req, res) => {
  //pedidos
  var pedidos = [req.body.pedidos];
  //variables
  var fecha = [req.body.fecha];
  var id_cliente = [req.body.id_cliente];
  var subtotal = [req.body.subtotal];
  var total = [req.body.total];
  var anticipo = [req.body.anticipo];
  var abono = [req.body.abono];
  var saldo = [req.body.saldo];
  var id_empleado = [req.body.id_empleado];
  var status = [req.body.status];
  var idventa;

  var querryventa = `insert into ventas (fecha, id_cliente, subtotal, total, anticipo, abono, saldo, id_empleado, status) VALUES('${fecha}', ${id_cliente}, ${subtotal}, ${total}, ${anticipo}, ${abono}, ${saldo}, ${id_empleado}, ${status});`;
  console.log(querryventa);
  //AÑADIR VENTA
  connect.query(querryventa, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("venta añadida");
    }
  });

  //CONSEGUIR ID DE LA VENTA RECIEN AGREGADA
  let querryid = `select max(id_ventas) as id from ventas where id_cliente=${id_cliente}`;
  connect.query(querryid, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(querryid);
//      console.log(res[0].id);
      idventa = res[0].id;
    }
  });

  sync.forEachOf(pedidos[0], function(pedido, i, innercallback)  {
    var querryexst = `select existencias from inventario where id_herraje='${pedido.id_herraje}' and nombre='${pedido.nombre}';`;
    var val = i;
    console.log("querryexst");
    //PRIMER QUERRY
    connect.query(querryexst, (err, rsl) => {
      if (err){
        throw err;
      } else {
        neoexist = rsl[0].existencias - pedido.cantidad;
        var querrycant = `update inventario set existencias=${neoexist} where id_herraje='${pedido.id_herraje}' and nombre='${pedido.nombre}';`;
        console.log(querrycant);
        //SEGUNDO QUERRY
        connect.query(querrycant, (err, rsl) => {
          if (err) {
            throw err;
          } else {
            var querryped = `insert into pedido (id_herraje, cantidad, precio_unitario, tipo_precio, id_ventas) VALUES('${pedido.id_herraje}', ${pedido.cantidad}, ${pedido.precio_unitario}, ${pedido.tipo_precio}, ${idventa});`;
            console.log(querryped);
            //TERCER QUERRY
            connect.query(querryped, (err, res) => {
              if (err){
                console.log(err);
              } else {
                console.log("listo");
              }
            });
          }
        }); 
      } 
    });
  });
});

//BORRAR VENTA
app.get('/deleteventa', async (req, res) => {
  var id = [req.query.id];

  // Buscar la venta para traer los pedidos
  const query = `select * from pedido where id_ventas='${id}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {

        
      // Eliminar los pedidos
      const queryPedidos = `delete from ventas where (id_ventas) in (${id})`;
      connect.query(queryPedidos, (err, result1) => {
        if (err) {
          throw err;
        } else {

       
        }
        // Eliminar las ventas
        const queryVentas = `delete from pedido where id_ventas = ${id}`;
        connect.query(queryVentas, (err, result2) => {
          if (err) {
            throw err;
          } else {
            res.send(result2);
            res.end();
          }
          });
      });
  
    }
  });
});
//EDITAR VENTA
app.post('/updateventa', async (req, res) => {
  console.log("----> no query") 
  console.log("---- nice"+req.query.id);
  //pedidos
  var pedidos = [req.body.pedidos];
  //variables
  var fecha = [req.body.fecha];
  var id_cliente = [req.body.id_cliente];
  var subtotal = [req.body.subtotal];
  var total = [req.body.total];
  var anticipo = [req.body.anticipo];
  var abono = [req.body.abono];
  var saldo = [req.body.saldo];
  var id_empleado = [req.body.id_empleado];
  var status = [req.body.status];
  var idventa =[req.query.id];
  console.log("--------<>>>"+req.query.id)
  var querryventa = ` update ventas set fecha='${fecha}', id_cliente=${id_cliente}, subtotal=${subtotal}, total=${total}, anticipo=${anticipo}, abono=${abono}, saldo=${saldo}, id_empleado=${id_empleado}, status=${status}  where id_ventas=${idventa};`;
  console.log(querryventa);
  //AÑADIR VENTA
  connect.query(querryventa, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("venta Editada");
    }
  })
})


//--------PEdido-------
//ver un pedido
app.get('/pedidos', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  const query = `select a.id_herraje,a.nombre,a.marca, b.cantidad,b.tipo_precio,b.precio_unitario from inventario a, pedido b where a.id_herraje=b.id_herraje and a.id_herraje='${id}' order by a.nombre;`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})
//borrar un pedido
app.get('/d', async (req, res) => {
  console.log(req.query);
  console.log(req.query.id);
  var id = [req.query.id];
  console.log(id);
  var pedidos;
  var ped;
  const query1 = `select * from inventario where id_herraje='${id}'`;
  connect.query(query1, (err, result) => {
    if (err) {
      //throw err;
    } else {
      // res.send(result);
      //res.end();
    }
    pedidos = result[0].id_herraje;
    console.log(pedidos);
    const query2 = `select * from pedido where id_herraje='${pedidos}'`;
    connect.query(query2, (err, result2) => {
      if (err) {
        //throw err;
      } else {
        //res.send(result2);
        //res.end();
      }

      const query3 = `delete  from pedido where id_herraje='${pedidos}'`;
      connect.query(query3, (err, result3) => {
        if (err) {
          // throw err;
        } else {
          // res.send(result2);
          //res.end();
        }
      })
    })
  })
})

 //eliminar un producto dela venta
 app.get('/dped', (req, res) => {
  var id1 = [req.query.id_pedido];
  const query = `delete from pedido where id_pedido='${id1}'`;
  connect.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      res.end();
    }
  });
})

//--------------------------------

app.listen(3000, (err, res) => {
  if (err) {
    console.log('Error al levantar servidor')
    return;
  }
  console.log('Apis escuchando en el puerto 3000');
})