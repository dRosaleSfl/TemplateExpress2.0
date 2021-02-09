-------Reporte de ventas semanal--------
delimiter //
create procedure Pvs(f_rep date)
begin
select sum(anticipo+abono+saldo) as total, fecha from ventas where fecha >= f_rep and fecha <= (select adddate(f_rep,7)) order by fecha;
end//

-------Reporte de ventas mensual--------
delimiter //
create procedure Pvm()
begin
select sum(anticipo+abono+saldo) as total, monthname(fecha) as nfecha from ventas group by nfecha;
end//

-------Reporte de ventas anual--------
delimiter //
create procedure Pva()
begin
select sum(anticipo+abono+saldo) as total, year(fecha) as nfecha from ventas group by nfecha;
end//

-------Reporte de producto mas caro--------
delimiter //
create procedure Pc()
begin
select max(preciosvidrio) as mas, id_herraje, nombre, marca from inventario group by nombre order by mas desc limit 1;
end//



 