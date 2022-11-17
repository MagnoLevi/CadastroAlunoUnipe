class Aluno {
    matricula;
    nome;
    nota1;
    nota2;
    nota3;

    constructor(matricula, nome, n1, n2, n3) {
        this.matricula = matricula;
        this.nome = nome;
        this.nota1 = n1;
        this.nota2 = n2;
        this.nota3 = n3;
    }

    exibeInfo() {

        return `<tr id="linhaAluno${this.matricula}" class="trTbody">
                    <td  style="text-align: center;">${this.matricula}</td>
                    <td>${this.nome}</td>
                    <td style="text-align: right;">${this.nota1}</td>
                    <td style="text-align: right;">${this.nota2}</td>
                    <td style="text-align: right;">${this.nota3}</td>
                    <td style="text-align: right;">${this.calculaMedia()}</td>
                    <td style="text-align: center;">
                        <img style="cursor: pointer;" onclick="exlcuiAluno(${this.matricula})" src="icons/trash.svg">
                    </td>
                </tr>`;
    }

    calculaMedia() {
        return ((this.nota1 + this.nota2 + this.nota3) / 3).toFixed(2);
    }
}

let flagNenhumAluno = 0; // flag se não tem nenhuma linha ja inserida
let arrayMatricula = []; // array de matricula

function insertAluno() {
    // Pega o html da tbody e cria a variavel da nova linha
    let concat = document.querySelector("#tbodyAluno").innerHTML
    let concatNew = ''
    // fim
    
    // Pega os campos do input
    let matricula = document.querySelector("#alunoMatricula").value
    let nome = document.querySelector("#alunoNome").value
    let nota1 = document.querySelector("#alunoNota1").value
    let nota3 = document.querySelector("#alunoNota3").value
    let nota2 = document.querySelector("#alunoNota2").value
    // fim
    
    if (matricula == '' || nome == '' || nota1 == '' || nota2 == '' || nota3 == '') { // Checa se todos os campos foram inseridos
        document.querySelector("#alertTextInput").innerHTML = "Insira todos os Campos" // escreve no campo de aviso
    
    } else if(arrayMatricula.includes(matricula) == true){ // Checa se essa matricula ja foi inserida
        document.querySelector("#alertTextInput").innerHTML = "Esta Matricula já foi inserida" // escreve no campo de aviso
    
    } else { // Criando a nova linha
        document.querySelector("#alertTextInput").innerHTML = "" // limpa o span de aviso

        arrayMatricula.push(matricula) // adiciona a matricula no array de matriculas

        // transforma as notas em parseFloat
        nota1 = parseFloat(nota1)
        nota2 = parseFloat(nota2)
        nota3 = parseFloat(nota3)
        // fim
        
        let a1 = new Aluno(matricula, nome, nota1, nota2, nota3) // classe constructor do aluno

        // Insere os dados do aluno na linha
        if (flagNenhumAluno == 0) {
            concatNew = `${a1.exibeInfo()}`
            flagNenhumAluno = 1
        
        } else {
            concatNew = `${a1.exibeInfo()} ${concat}`
        }
        // fim
        
        document.querySelector("#tbodyAluno").innerHTML = concatNew // insere a linha na tabela

        // limpa os inputs
        document.querySelector("#alunoMatricula").value = '';
        document.querySelector("#alunoNome").value = '';
        document.querySelector("#alunoNota1").value = '';
        document.querySelector("#alunoNota2").value = '';
        document.querySelector("#alunoNota3").value = '';
        // fim
    }
}

function exlcuiAluno(idMatricula) {
    let row = document.querySelector(`#linhaAluno${idMatricula}`)  // guarda numa variavel a linha
    row.parentNode.removeChild(row); // apaga a linha
    arrayMatricula.pop(idMatricula) // apaga a matricula do array   
}

