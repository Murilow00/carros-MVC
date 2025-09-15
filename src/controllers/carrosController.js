
import dados from "../models/dados.js";
const { carros } = dados;


const getAllCarros = (req,res) => {
    let resultado = carros;

    res.status(200).json({
        total: carros.length,
        sucess: true,
        data:resultado
    })
}

const getCarrosById = (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const carro = carros.find(c => c.id ===   id);

    if(id){
        res.status(200).json({
            sucess: true,
            data: carro
        })
    }else {
        res.status(404).json({
            sucess: false,
            message: `Nenhum carro com esse id: ${id} foi encontrado`
        })
    }
}



const atulizarCarro = (req, res) => {
    const { nome, modelo, ano, cor, qdeVitorias } =req.body;
    const id = req.params.id;
    id = parseInt(id);


    const idParaEditar = id

    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: `O carro com id de ${idParaEditar} não existe`
        })
    }
    
    const carroAtualizado = carros.map(carro => carro.id === idParaEditar ?{
        ...carro,
        ...nome(nome && { nome }),
        ...modelo(modelo && {modelo}),
        ...ano(ano && {ano: parseInt(ano)}),
        ...cor(cor && {cor}),
        ...qdeVitorias(qdeVitorias && {qdeVitorias: parseInt(qdeVitorias)})

    } :carro

    );
    carros.splice(0, carros.length, ...carroAtualizado)

    res.status(200).json({
        sucess: true,
        message: "carro atualizado",
        data: carroAtualizado
    })


}

const apagarCarro = (req, res) => {
    const { id } = req.params.id;
    
    if(isNaN(id)){
        return res.status(400).json({
            sucess: false,
            message: `O id ${id} não existe`
        })
    }

    const idParaApagar = parseInt(id)
    const carroParaRemover = carros.find(c => c.id === idParaApagar);

    if(!carroParaRemover){
        res.status(404).json({
            sucess: false,
            message: "O id dessa Barbie não existe"
        })
    }
    const carrosFiltrados = carros.filter( carro => carro.id !== idParaApagar)

    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        sucess: true,
        message: `O carro com id: ${id} foi apagado`,
        carroRemovido: carroParaRemover
})
}



const criarNovoCarro = (req, res) => {
    console.log("passou aqui")
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;
    console.log(nome)
    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "Nome são obrigatórios para um herói!",
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome,
        modelo,
        ano: parseInt(ano),
        cor,
        qtdeVitorias: parseInt(qtdeVitorias)
    };


    carros.push(novoCarro);

    res.status(201).json({
        success: true,
        message: "Novo herói cadastrado!",
        data: novoCarro,
    });
};



export { getAllCarros, getCarrosById, criarNovoCarro, atulizarCarro, apagarCarro }