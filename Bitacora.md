# Bitácora — Fredy alberto Licona Mena 

## 19-09-2025

**Qué hice:**
Creación del repositorio.
Inicialización del proyecto con la api
Incorporación del README inicial.
Eliminación de recursos que no se estaban utilizando.
Motar la lista de los personajes 
Creacion de la visual y la busqueda de personaes 
Creacion de todos los compoentes 
creacionde las RF-01 hasta RF-06
Correccion que se pasaron 

**Con qué me trabé:**
tambien presente probmemas con con el boton de buscar al principio se habia quedado pegado 
no me salia nada y la apps me quedaba en blanco al montar todo nuevamente quedo funcional 

 StatusMessage.tsx estaba escrito pero nunca importado, así que su CSS 
tampoco se aplicaba porque Vite no lo incluía en el bundle

**Cómo lo resolví:**
importé StatusMessage en ElementList, reemplacé los tres <p>/<div> 
manuales, y agregué las reglas CSS que faltaban para status-message--loading, 
--error y --empty

**Commits relacionados:**

*   c2d2271 (HEAD -> develop, origin/develop) Merge pull request #7 from FrdyWrld/feature/rf07-abort-favoritos
|\  
| * 5d9e704 (origin/feature/rf07-abort-favoritos, feature/rf07-abort-favoritos) fix: usar StatusMessage en los tres estados, agregar AbortController a la carga de personajes y corregir persistencia de favoritos
|/  
*   52b6f8d Merge pull request #6 from FrdyWrld/feature/rf06-reintento
|\  
| * e2a9eb1 (origin/feature/rf06-reintento, feature/rf06-reintento) feat: reintento RF06
|/  
*   db77807 Merge pull request #5 from FrdyWrld/feature/rf05-favoritos-estados
|\  
| * 4b09cc0 (origin/feature/rf05-favoritos-estados, feature/rf05-favoritos-estados) feat: favoritos y estados RF05
|/  
*   349b57d Merge pull request #4 from FrdyWrld/feature/rf04-detalle
|\  
| * 6306f23 (origin/feature/rf04-detalle, feature/rf04-detalle) feat: detalle de personaje RF04
|/  
*   aa73e7b Merge pull request #3 from FrdyWrld/feature/rf03-Busqueda
|\  
| * 15b09a8 (origin/feature/rf03-Busqueda, feature/rf03-Busqueda) feat: searchbar RF03
|/  
* f0138a0 (feature/rf02-estados) fix: ajustes en StatusMessage
*   1b1e682 Merge pull request #2 from FrdyWrld/feature/rf02-estados
|\  
| * e6135c0 (origin/feature/rf02-estados) feat: implement character loading status and error handling in ElementList component

|/  

**Estado al finalizar la jornada:**

Se implementaron todos los RF no se presento problemas al realizar las integraciones al DEVELOP