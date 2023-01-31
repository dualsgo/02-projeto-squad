class CadastroController {
    constructor(first_name, last_name, rg, cpf, email, phone, password, password_confirmation) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.rg = rg
        this.cpf = cpf
        this.email = email;
        this.phone = phone
        this.password = password;
        this.password_confirmation = password_confirmation
        this.array_cadastro = [{ first_name: 'teste', last_name: 'teste', rg: 123456789, cpf: '12345678910', email: 'teste@gmail.com', phone: 1234567891011, password: 'testeteste' }];
        this.erro = ['',
            'Senha e Confirmação diferentes',
            'Senha tem menos de 8 caracteres',
            'Senha tem mais de 20 caracteres']
    }
    erroChecked=function(termos){
        if(termos.checked){
            return true
        }
        return `Precisa estar de acordo com os termos`
    }
    phoneIsValid=function(phone, array_cadastro){
        for (var indice = 0; indice < array_cadastro.length; indice++) {
            if (array_cadastro[indice].phone == phone) {
                return `Telefone ${phone} já cadastrado`;
            }
            let regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
            if (regex.test(phone) != true){
                return `Formato de telefone invalido`
            }
        }
        return true
    }
    rgIsValid=function(rg, array_cadastro){
        for (var indice = 0; indice < array_cadastro.length; indice++) {
            if (array_cadastro[indice].rg == rg) {
                return `RG já cadastrado`;
            }
        }
        return true
    }
    emailIsValid = function(email, array_cadastro){
        for (var indice = 0; indice < array_cadastro.length; indice++) {
            if (array_cadastro[indice].email == email) {
                return `E-mail ${email} já cadastrado`;
            }
        }
        return true
    }
    passwordIsValid = function (password, password_confirmation) {
        if ((password === password_confirmation) &&
            (password.length >= 8) &&
            (password.length <= 20)) {
            return true;
        }
        else if (password !== password_confirmation) {
            return this.erro[1];
        }
        else if (password.length < 8) {
            return this.erro[2];
        }
        else if (password.length > 20) {
            return this.erro[3];
        }
    }
    IsValidCPF = function (array_cadastro) {
        let cpf = document.getElementById("cpf").value;
        cpf = cpf.replace(/[^\d]+/g, '');
        var cpfInteiro = new Array(11);
        var indice = 0;
        var tamanhoCPF = 11;
        var primeiroDigitoVerificador = 0;
        var vetorPrimeiroDigitoVerificador = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2);
        var vetorSegundoDigitoVerificador = new Array(11, 10, 9, 8, 7, 6, 5, 4, 3, 2);
        var segundoDigitoVerificador = 0;
        if (cpf.length != tamanhoCPF) {
            return "Um CPF é composto de 11 números"
        }
        for (var indice = 0; indice < array_cadastro.length; indice++) {
            if (array_cadastro[indice].cpf == cpf) {
                return 'CPF já cadastrado';
            }
        }
        if (cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999") {
            return "Não existe CPF com um único dígito repetido 11x"
        }
        for (indice = 0; indice < tamanhoCPF; indice++) {
            if (!isNaN(cpf[indice])) {
                cpfInteiro[indice] = parseInt(cpf[indice]);
            }
            else {
                return "Caractere Inválido"
            }
        }
        for (indice = 0; indice < tamanhoCPF - 2; indice++) {
            primeiroDigitoVerificador += cpfInteiro[indice] * vetorPrimeiroDigitoVerificador[indice];
        }
        primeiroDigitoVerificador = primeiroDigitoVerificador % 11;
        if (primeiroDigitoVerificador < 2) {
            primeiroDigitoVerificador = 0;
        }
        else {
            primeiroDigitoVerificador = tamanhoCPF - primeiroDigitoVerificador;
        }
        if (cpfInteiro[9] != primeiroDigitoVerificador) {
            return "Primeiro Dígito Verificador Errado"
        }
        for (indice = 0; indice < tamanhoCPF - 1; indice++) {
            segundoDigitoVerificador += cpfInteiro[indice] * vetorSegundoDigitoVerificador[indice];
        }
        segundoDigitoVerificador = segundoDigitoVerificador % 11
        if (segundoDigitoVerificador < 2) {
            segundoDigitoVerificador = 0;
        }
        else {
            segundoDigitoVerificador = tamanhoCPF - segundoDigitoVerificador;
        }
        if (cpfInteiro[10] != segundoDigitoVerificador) {
            return "Segundo Dígito Verificador Errado"
        }
        console.log("CPF Válido")
        return true;
    }
}
    cadastrar = function () {
        const cadastroController = new CadastroController();
        const cadastro = new Cadastro(document.getElementById('first_name').value,
            document.getElementById('last_name').value,
            document.getElementById('rg').value,
            document.getElementById('cpf').value,
            document.getElementById('email').value,
            document.getElementById('phone').value,
            document.getElementById('password').value,
            document.getElementById('password_confirmation').value,
            document.getElementById('cep').value,
            document.getElementById('rua').value,
            document.getElementById('bairro').value,
            document.getElementById('cidade').value,
            document.getElementById('uf').value,
            document.getElementById('ibge').value,
            document.getElementById('termos'))
        let erroPassword = cadastroController.passwordIsValid(cadastro.password, cadastro.password_confirmation)
        let erroCPF = cadastroController.IsValidCPF(cadastroController.array_cadastro);
        let erroEmail = cadastroController.emailIsValid(cadastro.email, cadastroController.array_cadastro) 
        let erroRG = cadastroController.rgIsValid(cadastro.rg, cadastroController.array_cadastro)
        let erroPhone = cadastroController.phoneIsValid(cadastro.phone, cadastroController.array_cadastro)
        let erroChecked = cadastroController.erroChecked(cadastro.termos)
        if ((erroPassword == true) &&
            (erroCPF == true) &&
            (cadastro.rua != '') &&
            (cadastro.bairro != '') &&
            (cadastro.cidade != '') &&
            (cadastro.uf != '') &&
            (cadastro.ibge != '') &&
            (erroEmail == true) &&
            (erroRG == true) &&
            (erroPhone == true) &&
            (erroChecked==true)) {
            cadastroController.array_cadastro.push(cadastro)
            alert("Você se cadastrou na lista de Espera");
        }
        else if (erroCPF != true) {
            alert(`${erroCPF}`);
        }
        else if (erroPassword != true) {
            alert(`${erroPassword}`);
        }
        else if ((cadastro.rua == '') &&
            (cadastro.bairro == '') &&
            (cadastro.cidade == '') &&
            (cadastro.uf == '') &&
            (cadastro.ibge == '')) {
            alert(`CEP inválido`);
        }
        else if(erroEmail != true){
            alert(`${erroEmail}`)
        }
        else if(erroRG != true){
            alert(`${erroRG}`)
        }
        else if(erroPhone != true){
            alert(`${erroPhone}`)
        }
        else if(erroChecked != true){
            alert(`${erroChecked}`)
        }
    
}


/*const form = document.querySelector('form');
cadastroController = new CadastroController(document.getElementById('full_name').value, document.getElementById('email').value,
    document.getElementById('password').value,
    document.getElementById('password_confirmation').value,
    document.getElementById('rg').value);
form.addEventListener('submit', (e) => {
    const cadastro = new Cadastro(document.getElementById('full_name').value, document.getElementById('email').value,
        document.getElementById('password').value, document.getElementById('password_confirmation').value,
        document.getElementById('rg').value)
    let erro = cadastroController.passwordIsValid(cadastroController.password, cadastroController.password_confirmation)
    if (erro == true) {
        cadastroController.array_cadastro.push(cadastro)
        alert("Você se cadastrou na lista de Espera");
    }
    else {
        console.log("Erro")
        alert(erro);
        e.preventDefault();
    }
});*/