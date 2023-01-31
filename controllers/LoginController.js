function login(){
    let count = 0
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value
    cadastro = new CadastroController("teste", "teste@gmail.com", "testeteste", "testeteste", "111111111");
    cadastro.array_cadastro.map(cadastro1 => {
        ((cadastro1.email === email)&&(cadastro1.password===senha)) ? (count++, alert("Você está Logado")) : ('')
    })
    if (count == 0) {
        alert(`${email} não cadastrado`)
    }
}