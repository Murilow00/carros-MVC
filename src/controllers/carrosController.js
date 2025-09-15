import dados from "../models/dados.js";
const { carros } = dados;

const getAllCarros = (req, res) => {
    let resultado = carros;

    res.status(200).json({
        total: resultado.length,
        carros: resultado
    });
};

const getCarroById = (req, res) => {
    const id = parseInt(req.params.id);

    const carro = carros.find(c => c.id ===id);

    if(!carro){
        res.status(404).json({
            sucess: false,
            messsage: `O carro com id: ${id} não foi encontrado`
        });
    };

    return res.status(200).json({
        total:carro.length,
        carros: carro
    });
};

const criarCarro = (req, res) => {
    const {nome, modelo, ano, cor, qtdeVitorias} = req.body;

    if(!nome || !modelo){
        return res.status(404).json({
            sucess: false,
            message: "Todos os carros precisam de um modelo"
        });
    }

    const novoCarro = {
        id:carros.length +1,
        nome: nome,
        modelo: modelo,
        ano: parseInt(ano),
        cor: cor,
        qtdeVitorias: parseInt(qtdeVitorias)
    }

    carros.push(novoCarro)

    return res.status(200).json({
        sucess: true,
        message: "Novo carro adicionado com sucesso",
        carro: novoCarro
    })
}

const deletarCarro = (req, res) => {
    const id =parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(404).json({
            sucess: false,
            message: "O id inserido é invalido"
        })
    }

    const carroParaRemover = carros.find(c => c.id === id);

    if(!carroParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Carro com o id: ${id} não existe`
        });
    }

    const carrosFiltrados = carros.filter(c => c.id !== id);

    carros.splice(0, carros.length, ...carrosFiltrados);

     return res.status(200).json({
        sucess: true,
        message: `O carro ${id} foi removido com sucesso`
    });
};

const atualizarCarro = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias} = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)){
        return res.status(404).json({
            sucess: false, 
            message: "o id deve ser um número válido."
        })
    }
 
    const carroExiste = carros.find(c => c.id === idParaEditar);
    if(!carroExiste){
        return res.status(404).json({
            sucess: false,
            message: `O carro com o id: ${idParaEditar} não existe.`
        })
    }

    const carrosAtualizados = carros.map(c => c.id === idParaEditar ? {
        ...c,
        ...(nome && { nome }),
        ...(modelo && { modelo}),
        ...(ano && { ano : parseInt (ano) }),
        ...(cor && { cor }),
        ...(qtdeVitorias && { qtdeVitorias : parseInt (qtdeVitorias) })
    }
        : c   
    );
   carros.splice(0, carros.length, ...carrosAtualizados);

   const carroEditado = carros.find(c => c.id === idParaEditar)
   return res.status(200).json({
      sucess: true,
      message: "Os dados do carro foram editados com sucesso",
      carro: carroEditado
    })
}
export { getAllCarros, getCarroById, criarCarro, deletarCarro, atualizarCarro }