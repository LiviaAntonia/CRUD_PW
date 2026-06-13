let products=JSON.parse(localStorage.getItem("products"))||[];

function showPage(id){
document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
if(id==="listagem") renderProducts();
}

function registerUser(){
const u=newUser.value.trim();
const p=newPass.value.trim();
if(!u||!p)return alert("Preencha os campos.");
localStorage.setItem("user",JSON.stringify({u,p}));
alert("Usuário criado.");
}

function login(){
const data=JSON.parse(localStorage.getItem("user"));
if(!data)return alert("Cadastre um usuário primeiro.");
if(loginUser.value===data.u && loginPass.value===data.p){
localStorage.setItem("logged","1");
updateMenu();
showPage("listagem");
}else alert("Login inválido.");
}

function logout(){
localStorage.removeItem("logged");
updateMenu();
showPage("home");
}

function updateMenu(){
const logged=localStorage.getItem("logged");
userMenu.style.display=logged?"block":"none";
guestMenu.style.display=logged?"none":"block";
}

function saveProduct(){
const id=document.getElementById("id").value;
const nome=document.getElementById("nome").value.trim();
const preco=document.getElementById("preco").value;

if(!nome||!preco) return alert("Nome e preço são obrigatórios.");

const duplicate=products.find(p=>p.nome.toLowerCase()===nome.toLowerCase()&&p.id!=id);
if(duplicate) return alert("Já existe um produto com esse nome.");

const product={
id:id||Date.now(),
nome,
preco,
marca:marca.value,
quantidade:quantidade.value,
codigo:codigo.value,
imagem:imagem.value
};

if(id){
const i=products.findIndex(p=>p.id==id);
products[i]=product;
}else{
products.push(product);
}

localStorage.setItem("products",JSON.stringify(products));
clearForm();
showPage("listagem");
}

function renderProducts(){
const search=document.getElementById("search").value.toLowerCase();
tbody.innerHTML="";

products.filter(p=>
p.nome.toLowerCase().includes(search)||
(p.marca||"").toLowerCase().includes(search)||
(p.codigo||"").toLowerCase().includes(search)
).forEach(p=>{

tbody.innerHTML+=`
<tr>
<td>${p.imagem?`<img class="prod" src="${p.imagem}">`:"N/A"}</td>
<td>${p.nome}</td>
<td>R$ ${p.preco}</td>
<td>${p.marca||"N/A"}</td>
<td>${p.quantidade||"N/A"}</td>
<td>${p.codigo||"N/A"}</td>
<td>
<button class="btn warning" onclick="editProduct(${p.id})">Editar</button>
<button class="btn danger" onclick="deleteProduct(${p.id})">Excluir</button>
</td>
</tr>`;
});

totalProdutos.textContent=products.length;
}

function editProduct(idp){
const p=products.find(x=>x.id==idp);
id.value=p.id;
nome.value=p.nome;
preco.value=p.preco;
marca.value=p.marca;
quantidade.value=p.quantidade;
codigo.value=p.codigo;
imagem.value=p.imagem;
showPage("cadastro");
}

function deleteProduct(idp){
if(confirm("Excluir produto?")){
products=products.filter(p=>p.id!=idp);
localStorage.setItem("products",JSON.stringify(products));
renderProducts();
}
}

function clearForm(){
["id","nome","preco","marca","quantidade","codigo","imagem"]
.forEach(i=>document.getElementById(i).value="");
}

updateMenu();
showPage("home");