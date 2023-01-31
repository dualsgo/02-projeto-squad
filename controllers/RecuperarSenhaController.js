function recuperarSenha() {
    let count = 0
    const email = document.getElementById('email').value;
    cadastro = new CadastroController('teste', 'teste', '123456789', '123456789101', 'teste@gmail.com', '1234567891011', 'testeteste');
    cadastro.array_cadastro[0].email='teste@gmail.com'
    console.log(cadastro.array_cadastro)
    cadastro.array_cadastro.map(cadastro1 => {
        cadastro1.email === email ? (count++, alert("Foi enviado para o e-mail informado o link de recuperação de senha")) : ('')
    })
    if (count == 0) {
        alert(`${email} não cadastrado`)
    }

}