// 1.1 
  db.funcionarios.insertOne({
    nome: "Carol",
    telefone: "11.90000.0000",
    email: "carol.dev@momento.org",
    dataAdmissao: "2025-01-01",
    cargo: "Desenvolvedor",
    salario: 5400,
    departamento: ObjectId("85992103f9b3e0b3b3c1fe74")
})

// 1.2 R: 24
 db.funcionarios.countDocuments()

// 1.3 R: 6
db.funcionarios.countDocuments({
  departamento: ObjectId("85992103f9b3e0b3b3c1fe74")
})

// 1.4 R: 
  nome: 'Executivo'
}
{
  nome: 'Vendas'
}
{
  nome: 'Marketing'
}
{
  nome: 'Financeiro'
}
{
  nome: 'Tecnologia'
}
{
  nome: 'Recursos Humanos'
}
{
  nome: 'Dados'
}

// R: 6 departamentos
db.departamentos.countDocuments()

// 1.5 R: 4 escritórios
db.escritorios.countDocuments()
// R: países: 'ENG', 'EQU', 'IRE', 'USA'
db.escritorios.distinct("pais")

// 2.1 R: 10 funcionários
db.funcionarios.countDocuments({
  departamento: ObjectId("85992103f9b3e0b3b3c1fe71")
})

// 2.2 R: 95100
db.funcionarios.aggregate([
  {
    $match: {
      departamento: ObjectId("85992103f9b3e0b3b3c1fe71")
    }
  },
  {
    $group: {
      _id: null,
      custoTotalSalarios: { $sum: "$salario" }
    }
  }
])

// 2.3 R: 9569
db.funcionarios.aggregate([
  {
    $match: {
      cargo: {
        $nin: ["CEO", "CMO", "CFO"]
      }
    }
  },
  {
    $group: {
      _id: null,
      mediaSalarial: {
        $avg: "$salario"
      }
    }
  }
])

// 2.4 R: 4700
db.funcionarios.aggregate([
  {
    $match: {
      departamento: ObjectId("85992103f9b3e0b3b3c1fe74")
    }
  },
  {
    $group: {
      _id: null,
      mediaSalarial: {
        $avg: "$salario"
      }
    }
  }
])

// 2.5 R: 
departamento: 'Executivo',
  mediaSalarial: 71000

db.funcionarios.aggregate([
  {
    $group: {
      _id: "$departamento",
      mediaSalarial: { $avg: "$salario" }
    }
  },
  {
    $lookup: {
      from: "departamentos",
      localField: "_id",
      foreignField: "_id",
      as: "departamento"
    }
  },
  {
    $unwind: "$departamento"
  },
  {
    $project: {
      _id: 0,
      departamento: "$departamento.nome",
      mediaSalarial: { $round: ["$mediaSalarial", 2] }
    }
  },
  {
    $sort: { mediaSalarial: -1 }
  },
  {
    $limit: 1
  }
])

// 2.6 R: 
totalFuncionarios: 1,
  departamento: 'Executivo'

db.funcionarios.aggregate([
  {
    $group: {
      _id: "$departamento",
      totalFuncionarios: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "departamentos",
      localField: "_id",
      foreignField: "_id",
      as: "departamento"
    }
  },
  {
    $unwind: "$departamento"
  },
  {
    $project: {
      _id: 0,
      departamento: "$departamento.nome",
      totalFuncionarios: 1
    }
  },
  {
    $sort: { totalFuncionarios: 1 }
  },
  {
    $limit: 1
  }
])

// 3.1 R: 7
db.funcionarios.countDocuments({
  "dependentes.conjuge": { $exists: true }
})

// 3.2 R: 7
db.funcionarios.countDocuments({
  "dependentes.filhos": { $exists: true }
})

// 3.3 R:
_id: ObjectId('5f8b3f3f9b3e0b3b3c1e3e53'),
  nome: 'Alexa Green',
  telefone: '515.127.4563',
  cargo: 'Consultor de Vendas',
  salario: 6000,
  comissionado: true,
  departamento: ObjectId('85992103f9b3e0b3b3c1fe71')

db.funcionarios.find()
.sort({ dataAdmissao: 1 })
.limit(1)

// 3.4 R:
_id: ObjectId('6a2706017381f391c1aedb83'),
  nome: 'Carol',
  telefone: '11.90000.0000',
  email: 'carol.dev@momento.org',
  dataAdmissao: '2025-01-01',
  cargo: 'Desenvolvedor',
  salario: 5400,
  departamento: ObjectId('85992103f9b3e0b3b3c1fe74')
}
db.funcionarios.find()
.sort({ dataAdmissao: -1 })
.limit(1)

// 3.5 R: 
{
  nome: 'Jenny Tseng',
  cargo: 'Consultor de Vendas'
}
{
  nome: 'Alexa Green',
  cargo: 'Consultor de Vendas'
}
{
  nome: 'Jon Deegan',
  cargo: 'Consultor de Vendas'
}
{
  nome: 'Michael Hartstein',
  cargo: 'Consultor de Vendas'
}
{
  nome: 'Michael Hartstein',
  cargo: 'Consultor de Vendas'
}

db.funcionarios.find(
  {},
  {
    _id: 0,
    nome: 1,
    dataAdmissao: 1,
    cargo: 1
  }
)
.sort({ dataAdmissao: 1 })
.limit(5)

// 3.6 R: 11
db.funcionarios.countDocuments({
  dataAdmissao: {
    $gte: "1990-01-01",
    $lte: "1999-12-31"
  }
})

// 3.7 R:
{
  totalFuncionarios: 6,
  anoContratacao: '',
  mediaSalarial: 6000
}
{
  totalFuncionarios: 1,
  anoContratacao: '1980',
  mediaSalarial: 9700
}
{
  totalFuncionarios: 1,
  anoContratacao: '1987',
  mediaSalarial: 23000
}
{
  totalFuncionarios: 1,
  anoContratacao: '1994',
  mediaSalarial: 12500
}
{
  totalFuncionarios: 2,
  anoContratacao: '1995',
  mediaSalarial: 13840
}
{
  totalFuncionarios: 3,
  anoContratacao: '1996',
  mediaSalarial: 30966.67
}
{
  totalFuncionarios: 4,
  anoContratacao: '1997',
  mediaSalarial: 15275
}
{
  totalFuncionarios: 1,
  anoContratacao: '1999',
  mediaSalarial: 8900
}
{
  totalFuncionarios: 1,
  anoContratacao: '2000',
  mediaSalarial: 4100
}
{
  totalFuncionarios: 1,
  anoContratacao: '2005',
  mediaSalarial: 3400
}
{
  totalFuncionarios: 1,
  anoContratacao: '2008',
  mediaSalarial: 3500
}
{
  totalFuncionarios: 1,
  anoContratacao: '2009',
  mediaSalarial: 2900
}
{
  totalFuncionarios: 1,
  anoContratacao: '2009',
  mediaSalarial: 2900
}

db.funcionarios.aggregate([
  {
    $group: {
      _id: {
        $substr: ["$dataAdmissao", 0, 4]
      },
      mediaSalarial: {
        $avg: "$salario"
      },
      totalFuncionarios: {
        $sum: 1
      }
    }
  },
  {
    $project: {
      _id: 0,
      anoContratacao: "$_id",
      totalFuncionarios: 1,
      mediaSalarial: {
        $round: ["$mediaSalarial", 2]
      }
    }
  },
  {
    $sort: {
      anoContratacao: 1
    }
  }
])

// 4.1 R: 
  escritorio: 'Umbrella Corp',
  custoTotal: 376486500
}
{
  escritorio: 'Stark Industries',
  custoTotal: 189792.5
}
{
  escritorio: 'Wayne Offices',
  custoTotal: 149628.75
}
{
  escritorio: 'Wayne Offices',
  custoTotal: 149628.75
}
db.escritorios.aggregate([
  {
    $unwind: "$suprimentos"
  },
  {
    $group: {
      _id: "$nome",
      custoTotal: {
        $sum: {
          $multiply: [
            "$suprimentos.quantidade",
            "$suprimentos.precoUnitario"
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      escritorio: "$_id",
      custoTotal: { $round: ["$custoTotal", 2] }
    }
  },
  {
    $sort: {
      custoTotal: -1
    }
  }
])

// 4.2 R: 
  escritorio: 'Wayne Offices',
  quantidadeTiposSuprimentos: 5
}
{
  escritorio: 'Winterfell Offices',
  quantidadeTiposSuprimentos: 5
}
{
  escritorio: 'Stark Industries',
  quantidadeTiposSuprimentos: 4
}
{
  escritorio: 'Stark Industries',
  quantidadeTiposSuprimentos: 4
}

db.escritorios.aggregate([
  {
    $project: {
      _id: 0,
      escritorio: "$nome",
      quantidadeTiposSuprimentos: {
        $size: "$suprimentos"
      }
    }
  },
  {
    $sort: {
      quantidadeTiposSuprimentos: -1
    }
  }
])

// 4.3 R: 
{
  escritorio: 'Wayne Offices',
  produto: 'Computadores',
  precoUnitario: 5000
}

db.escritorios.aggregate([
  {
    $unwind: "$suprimentos"
  },
  {
    $sort: {
      "suprimentos.precoUnitario": -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      escritorio: "$nome",
      produto: "$suprimentos.produto",
      precoUnitario: "$suprimentos.precoUnitario"
    }
  }
])

// 4.4 R:
{
  valorTotalInventario: 376975063.75
}

db.escritorios.aggregate([
  {
    $unwind: "$suprimentos"
  },
  {
    $group: {
      _id: null,
      valorTotalInventario: {
        $sum: {
          $multiply: [
            "$suprimentos.quantidade",
            "$suprimentos.precoUnitario"
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      valorTotalInventario: {
        $round: ["$valorTotalInventario", 2]
      }
    }
  }
])

// 5.1 R: 
[
  'Capacete do Homem-Formiga',
  'Fake Batarang',
  'Lança-Teias',
  'Laço da Verdade',
  'Nulificador Total',
  'Sabre de Luz (Mace Windu)',
  'Sentinelas do Bolivar Trask',
  'Uniforme de Moléculas Instáveis',
  'Uniforme do Superman'
]
db.vendas.distinct("produto")

// 5.2 R:
{
  _id: 'Laço da Verdade',
  quantidadeTotalVendida: 12
}

db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      quantidadeTotalVendida: {
        $sum: "$quantidade"
      }
    }
  },
  {
    $sort: {
      quantidadeTotalVendida: -1
    }
  },
  {
    $limit: 1
  }
])

// 5.3 R: 
{
  _id: 'Uniforme do Superman',
  quantidadeTotalVendida: 2
}

db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      quantidadeTotalVendida: {
        $sum: "$quantidade"
      }
    }
  },
  {
    $sort: {
      quantidadeTotalVendida: 1
    }
  },
  {
    $limit: 1
  }
])

// 5.4 R: 
{
  _id: 'Sabre de Luz (Mace Windu)',
  receitaTotal: 7922.32
}

db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      receitaTotal: {
        $sum: {
          $multiply: ["$quantidade", "$precoUnitario"]
        }
      }
    }
  },
  {
    $sort: {
      receitaTotal: -1
    }
  },
  {
    $limit: 1
  }
]) 

// 5.5 R:
{
  _id: 'Sabre de Luz (Mace Windu)',
  precoUnitario: 990.29
}

db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      precoUnitario: { $max: "$precoUnitario" }
    }
  },
  {
    $sort: {
      precoUnitario: -1
    }
  },
  {
    $limit: 1
  }
])

// 5.6 R: 
{
  faturamentoTotal: 27076.15
}

db.vendas.aggregate([
  {
    $group: {
      _id: null,
      faturamentoTotal: {
        $sum: {
          $multiply: ["$quantidade", "$precoUnitario"]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      faturamentoTotal: {
        $round: ["$faturamentoTotal", 2]
      }
    }
  }
])

// 5.7 R:  9

db.vendas.countDocuments({
  dataVenda: {
    $gte: "2023-06-01",
    $lte: "2023-06-30"
  }
})

// 5.8 R: 
  _id: ObjectId('5f8b3f3f9b3e0b3b3c1e3e57'),
  totalVendas: 3
}

db.vendas.aggregate([
  {
    $group: {
      _id: "$vendedor",
      totalVendas: { $sum: 1 }
    }
  },
  {
    $sort: {
      totalVendas: -1
    }
  },
  {
    $limit: 1
  }
])

// 5.9 R:
{
  nome: 'Michael Hartstein',
  receitaTotal: 13256.17
}

db.vendas.aggregate([
  {
    $group: {
      _id: "$vendedor",
      receitaTotal: {
        $sum: {
          $multiply: ["$quantidade", "$precoUnitario"]
        }
      }
    }
  },
  {
    $lookup: {
      from: "funcionarios",
      localField: "_id",
      foreignField: "_id",
      as: "vendedor"
    }
  },
  {
    $unwind: "$vendedor"
  },
  {
    $project: {
      _id: 0,
      nome: "$vendedor.nome",
      receitaTotal: { $round: ["$receitaTotal", 2] }
    }
  },
  {
    $sort: {
      receitaTotal: -1
    }
  },
  {
    $limit: 1
  }
])

// 6.1 R: 
db.departamentos.insertOne({
  nome: "Inovações",
  escritorio: ObjectId("5f8b3f3f9b3e0b3b3c1e3e3e")
})

// 6.2 R:
db.funcionarios.updateMany(
  {
    nome: {
      $in: [
        "Alexander Hunold",
        "Bruce Ernst"
      ]
    }
  },
  {
    $set: {
      departamento: ObjectId("6a2712cd7381f391c1aedb84")
    }
  }
)

// 6.3 R: 
db.funcionarios.updateMany(
  {
    departamento: ObjectId("85992103f9b3e0b3b3c1fe74")
  },
  {
    $mul: {
      salario: 1.10
    }
  }
)

// 6.4 R:
db.funcionarios.updateOne(
  {
    nome: "Bruce Ernst"
  },
  {
    $set: {
      cargo: "Senior Web Developer",
      salario: 5000
    }
  }
)

// 6.5 R: 
db.escritorios.updateOne(
  {
    nome: "Wayne Offices"
  },
  {
    $push: {
      suprimentos: {
        produto: "Headsets",
        quantidade: 15,
        precoUnitario: 150
      }
    }
  }
)

// 6.6 R: 
db.funcionarios.deleteMany({
  dataAdmissao: {
    $lt: "1990-01-01"
  }
})

// 7.1 R:
{
  numeroFuncionarios: 1,
  salarioTotal: 71000,
  departamento: 'Executivo',
  mediaSalarial: 71000
}
{
  numeroFuncionarios: 2,
  salarioTotal: 8500,
  departamento: 'Inovações',
  mediaSalarial: 4250
}
{
  numeroFuncionarios: 5,
  salarioTotal: 64080,
  departamento: 'Recursos Humanos',
  mediaSalarial: 12816
}
{
  numeroFuncionarios: 4,
  salarioTotal: 23430,
  departamento: 'Tecnologia',
  mediaSalarial: 5857.5
}
{
  numeroFuncionarios: 4,
  salarioTotal: 23430,
  departamento: 'Tecnologia',
  mediaSalarial: 5857.5
}

db.funcionarios.aggregate([
  {
    $group: {
      _id: "$departamento",
      numeroFuncionarios: { $sum: 1 },
      salarioTotal: { $sum: "$salario" },
      mediaSalarial: { $avg: "$salario" }
    }
  },
  {
    $lookup: {
      from: "departamentos",
      localField: "_id",
      foreignField: "_id",
      as: "departamento"
    }
  },
  {
    $unwind: "$departamento"
  },
  {
    $project: {
      _id: 0,
      departamento: "$departamento.nome",
      numeroFuncionarios: 1,
      salarioTotal: 1,
      mediaSalarial: {
        $round: ["$mediaSalarial", 2]
      }
    }
  },
  {
    $sort: {
      departamento: 1
    }
  }
])

// 7.2 R: 
{
  quantidadeFuncionarios: 8,
  cargo: 'Consultor de Vendas'
}
{
  quantidadeFuncionarios: 3,
  cargo: 'Web Developer'
}
{
  quantidadeFuncionarios: 3,
  cargo: 'Gerente de Estoque'
}

db.funcionarios.aggregate([
  {
    $group: {
      _id: "$cargo",
      quantidadeFuncionarios: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      cargo: "$_id",
      quantidadeFuncionarios: 1
    }
  },
  {
    $sort: {
      quantidadeFuncionarios: -1
    }
  },
  {
    $limit: 3
  }
])

// 7.3 R:
{
  nome: 'Bruce Ernst',
  cargo: 'Senior Web Developer',
  salario: 5000,
  departamento: 'Inovações',
  mediaDepartamento: 4250
}
{
  nome: 'Normam Osborn',
  cargo: 'Gerente de Recursos Químicos',
  salario: 18080,
  departamento: 'Recursos Humanos',
  mediaDepartamento: 12816
}
{
  nome: 'Matthew Weiss',
  cargo: 'Gerente de Estoque',
  salario: 14000,
  departamento: 'Recursos Humanos',
  mediaDepartamento: 12816
}
{
  nome: 'Diana Lorentz',
  cargo: 'Web Developer Senior',
  salario: 9790,
  departamento: 'Tecnologia',
  mediaDepartamento: 5857.5
}
{
  nome: 'Carol',
  cargo: 'Desenvolvedor',
  salario: 5940.000000000001,
  departamento: 'Tecnologia',
  mediaDepartamento: 5857.5
}
{
  nome: 'Pat Ferreira',
  cargo: 'Representante de Vendas para a América Latina',
  salario: 34000,
  departamento: 'Vendas',
  mediaDepartamento: 9510
}
{
  nome: 'Pat Ferreira',
  cargo: 'Representante de Vendas para a América Latina',
  salario: 34000,
  departamento: 'Vendas',
  mediaDepartamento: 9510
}

db.funcionarios.aggregate([
  {
    $lookup: {
      from: "funcionarios",
      let: { deptId: "$departamento" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$departamento", "$$deptId"]
            }
          }
        },
        {
          $group: {
            _id: null,
            mediaDepartamento: {
              $avg: "$salario"
            }
          }
        }
      ],
      as: "estatisticas"
    }
  },
  {
    $unwind: "$estatisticas"
  },
  {
    $match: {
      $expr: {
        $gt: ["$salario", "$estatisticas.mediaDepartamento"]
      }
    }
  },
  {
    $lookup: {
      from: "departamentos",
      localField: "departamento",
      foreignField: "_id",
      as: "departamentoInfo"
    }
  },
  {
    $unwind: "$departamentoInfo"
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      cargo: 1,
      salario: 1,
      departamento: "$departamentoInfo.nome",
      mediaDepartamento: {
        $round: ["$estatisticas.mediaDepartamento", 2]
      }
    }
  },
  {
    $sort: {
      departamento: 1,
      salario: -1
    }
  }
])

// 7.4 R: 
  contratacoes: 6,
  ano: ''
}
{
  contratacoes: 1,
  ano: '1994'
}
{
  contratacoes: 2,
  ano: '1995'
}
{
  contratacoes: 3,
  ano: '1996'
}
{
  contratacoes: 4,
  ano: '1997'
}
{
  contratacoes: 1,
  ano: '1999'
}
{
  contratacoes: 1,
  ano: '2000'
}
{
  contratacoes: 1,
  ano: '2005'
}
{
  contratacoes: 1,
  ano: '2008'
}
{
  contratacoes: 1,
  ano: '2009'
}
{
  contratacoes: 1,
  ano: '2025'
}

db.funcionarios.aggregate([
  {
    $group: {
      _id: {
        $substr: ["$dataAdmissao", 0, 4]
      },
      contratacoes: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      ano: "$_id",
      contratacoes: 1
    }
  },
  {
    $sort: {
      ano: 1
    }
  }
])

// 7.5 R: 
{
  numeroVendas: 3,
  vendedor: 'Michael Hartstein',
  receitaTotal: 13256.17
}
{
  numeroVendas: 3,
  vendedor: 'Jon Deegan',
  receitaTotal: 4459.11
}
{
  numeroVendas: 2,
  vendedor: 'Jenny Tseng',
  receitaTotal: 4051.08
}
{
  numeroVendas: 2,
  vendedor: 'Sundar Ande',
  receitaTotal: 3107.94
}
{
  numeroVendas: 1,
  vendedor: 'Normam Osborn',
  receitaTotal: 711.57
}
{
  numeroVendas: 1,
  vendedor: 'Alexa Green',
  receitaTotal: 478.58
}
{
  numeroVendas: 1,
  vendedor: 'Kelly Chung',
  receitaTotal: 300.13
}

db.vendas.aggregate([
  {
    $match: {
      vendedor: { $exists: true }
    }
  },
  {
    $group: {
      _id: "$vendedor",
      numeroVendas: { $sum: 1 },
      receitaTotal: {
        $sum: {
          $multiply: ["$quantidade", "$precoUnitario"]
        }
      }
    }
  },
  {
    $lookup: {
      from: "funcionarios",
      localField: "_id",
      foreignField: "_id",
      as: "vendedor"
    }
  },
  {
    $unwind: "$vendedor"
  },
  {
    $project: {
      _id: 0,
      vendedor: "$vendedor.nome",
      numeroVendas: 1,
      receitaTotal: {
        $round: ["$receitaTotal", 2]
      }
    }
  },
  {
    $sort: {
      receitaTotal: -1
    }
  }
])

// 7.6 R: 
{
  produto: 'Sentinelas do Bolivar Trask',
  quantidadeVendedores: 1
}
{
  produto: 'Fake Batarang',
  quantidadeVendedores: 1
}
{
  produto: 'Lança-Teias',
  quantidadeVendedores: 1
}
{
  produto: 'Sabre de Luz (Mace Windu)',
  quantidadeVendedores: 1
}
{
  produto: 'Uniforme de Moléculas Instáveis',
  quantidadeVendedores: 1
}

db.vendas.aggregate([
  {
    $match: {
      vendedor: { $exists: true }
    }
  },
  {
    $group: {
      _id: "$produto",
      vendedores: {
        $addToSet: "$vendedor"
      }
    }
  },
  {
    $project: {
      _id: 0,
      produto: "$_id",
      quantidadeVendedores: {
        $size: "$vendedores"
      }
    }
  },
  {
    $match: {
      quantidadeVendedores: 1
    }
  }
])

// 8.1 R: 4
db.funcionarios.find({
  departamento: ObjectId("85992103f9b3e0b3b3c1fe76"),
  $or: [
    { "dependentes.conjuge": { $exists: true } },
    { "dependentes.filhos": { $exists: true } }
  ]
},
{
  _id: 0,
  nome: 1,
  cargo: 1,
  dependentes: 1
})

// 8.2 R:
{
  nome: 'Elisabeth Braddock',
  cargo: 'CEO',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Executivo'
}
{
  nome: 'Pat Ferreira',
  cargo: 'Representante de Vendas para a América Latina',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Alexander Hunold',
  cargo: 'Web Developer',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Inovações'
}
{
  nome: 'Bruce Ernst',
  cargo: 'Senior Web Developer',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Inovações'
}
{
  nome: 'David Austin',
  cargo: 'Web Developer',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Tecnologia'
}
{
  nome: 'Valli Stark',
  cargo: 'Web Developer',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Tecnologia'
}
{
  nome: 'Diana Lorentz',
  cargo: 'Web Developer Senior',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Tecnologia'
}
{
  nome: 'Matthew Weiss',
  cargo: 'Gerente de Estoque',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Recursos Humanos'
}
{
  nome: 'Adam Fripp',
  cargo: 'Gerente de Estoque',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Recursos Humanos'
}
{
  nome: 'Payam Kaufling',
  cargo: 'Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Shanta Vollman',
  cargo: 'Gerente de Estoque',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Recursos Humanos'
}
{
  nome: 'Sarah Bell',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Britney Everett',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Den Raphaely',
  cargo: 'Gerente de Recursos',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Recursos Humanos'
}
{
  nome: 'Normam Osborn',
  cargo: 'Gerente de Recursos Químicos',
  escritorioDepartamento: 'Wayne Offices',
  departamento: 'Recursos Humanos'
}
{
  nome: 'Alexa Green',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Kelly Chung',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Jenny Tseng',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Michael Hartstein',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}
{
  nome: 'Jon Deegan',
  cargo: 'Consultor de Vendas',
  escritorioDepartamento: 'Winterfell Offices',
  departamento: 'Vendas'
}


db.funcionarios.aggregate([
  {
    $lookup: {
      from: "departamentos",
      localField: "departamento",
      foreignField: "_id",
      as: "departamento"
    }
  },
  {
    $unwind: "$departamento"
  },
  {
    $match: {
      $expr: {
        $ne: ["$escritorio", "$departamento.escritorio"]
      }
    }
  },
  {
    $lookup: {
      from: "escritorios",
      localField: "escritorio",
      foreignField: "_id",
      as: "escritorioFuncionario"
    }
  },
  {
    $lookup: {
      from: "escritorios",
      localField: "departamento.escritorio",
      foreignField: "_id",
      as: "escritorioDepartamento"
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      cargo: 1,
      escritorioFuncionario: {
        $arrayElemAt: ["$escritorioFuncionario.nome", 0]
      },
      escritorioDepartamento: {
        $arrayElemAt: ["$escritorioDepartamento.nome", 0]
      },
      departamento: "$departamento.nome"
    }
  }
])

// 8.3 R:
{
  pais: 'ENG',
  nomeEscritorio: 'Stark Industries',
  numeroDepartamentos: 2,
  numeroFuncionarios: 0,
  custoTotalSalarios: 0,
  custoTotalSuprimentos: 189792.5
}
{
  pais: 'EQU',
  nomeEscritorio: 'Umbrella Corp',
  numeroDepartamentos: 0,
  numeroFuncionarios: 0,
  custoTotalSalarios: 0,
  custoTotalSuprimentos: 376486500
}
{
  pais: 'USA',
  nomeEscritorio: 'Wayne Offices',
  numeroDepartamentos: 5,
  numeroFuncionarios: 12,
  custoTotalSalarios: 167010,
  custoTotalSuprimentos: 151878.75
}
{
  pais: 'IRE',
  nomeEscritorio: 'Winterfell Offices',
  numeroDepartamentos: 1,
  numeroFuncionarios: 10,
  custoTotalSalarios: 95100,
  custoTotalSuprimentos: 149142.5


db.escritorios.aggregate([
  {
    $lookup: {
      from: "departamentos",
      localField: "_id",
      foreignField: "escritorio",
      as: "departamentos"
    }
  },
  {
    $lookup: {
      from: "funcionarios",
      let: {
        departamentosIds: "$departamentos._id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$departamento", "$$departamentosIds"]
            }
          }
        }
      ],
      as: "funcionarios"
    }
  },
  {
    $project: {
      _id: 0,
      nomeEscritorio: "$nome",
      pais: 1,

      numeroDepartamentos: {
        $size: "$departamentos"
      },

      numeroFuncionarios: {
        $size: "$funcionarios"
      },

      custoTotalSalarios: {
        $sum: "$funcionarios.salario"
      },

      custoTotalSuprimentos: {
        $sum: {
          $map: {
            input: "$suprimentos",
            as: "sup",
            in: {
              $multiply: [
                "$$sup.quantidade",
                "$$sup.precoUnitario"
              ]
            }
          }
        }
      }
    }
  },
  {
    $sort: {
      nomeEscritorio: 1
    }
  }
])

// 8.4 R:
  {
  diferencaSalarial: 0,
  departamento: 'Executivo'
}

db.funcionarios.aggregate([
  {
    $group: {
      _id: "$departamento",
      maiorSalario: { $max: "$salario" },
      menorSalario: { $min: "$salario" }
    }
  },
  {
    $project: {
      diferencaSalarial: {
        $subtract: ["$maiorSalario", "$menorSalario"]
      }
    }
  },
  {
    $lookup: {
      from: "departamentos",
      localField: "_id",
      foreignField: "_id",
      as: "departamento"
    }
  },
  {
    $unwind: "$departamento"
  },
  {
    $project: {
      _id: 0,
      departamento: "$departamento.nome",
      maiorSalario: 1,
      menorSalario: 1,
      diferencaSalarial: 1
    }
  },
  {
    $sort: {
      diferencaSalarial: 1
    }
  },
  {
    $limit: 1
  }
])

// 8.5 R:
  {
  produto: 'Uniforme do Superman',
  quantidade: 1,
  precoUnitario: 300.13
}
{
  produto: 'Uniforme do Superman',
  quantidade: 1,
  precoUnitario: 300.13
}
{
  produto: 'Uniforme de Moléculas Instáveis',
  quantidade: 10,
  precoUnitario: 158.29
}

db.vendas.find(
  {
    produto: {
      $regex: "Uniforme",
      $options: "i"
    }
  },
  {
    _id: 0,
    produto: 1,
    quantidade: 1,
    precoUnitario: 1
  }
)

// 8.6 R: 
  {
  produto: 'Uniforme do Superman',
  quantidade: 1,
  precoUnitario: 300.13,
  dataVenda: '2023-06-19'
}
{
  produto: 'Lança-Teias',
  quantidade: 3,
  precoUnitario: 237.19,
  dataVenda: '2023-06-05'
}
{
  produto: 'Capacete do Homem-Formiga',
  quantidade: 4,
  precoUnitario: 289.29,
  dataVenda: '2023-06-21'
}
{
  produto: 'Nulificador Total',
  quantidade: 5,
  precoUnitario: 750.19,
  dataVenda: '2023-06-13'
}
{
  produto: 'Laço da Verdade',
  quantidade: 6,
  precoUnitario: 325.13,
  dataVenda: '2023-06-14'
}
{
  produto: 'Laço da Verdade',
  quantidade: 6,
  precoUnitario: 325.13,
  dataVenda: '2023-06-10'
}
{
  produto: 'Sabre de Luz (Mace Windu)',
  quantidade: 8,
  precoUnitario: 990.29,
  dataVenda: '2023-06-15'
}
{
  produto: 'Sentinelas do Bolivar Trask',
  quantidade: 9,
  precoUnitario: 150.13,
  dataVenda: '2023-06-20'
}
{
  produto: 'Uniforme de Moléculas Instáveis',
  quantidade: 10,
  precoUnitario: 158.29,
  dataVenda: '2023-06-29'
}

db.vendas.find(
  {
    dataVenda: {
      $gte: "2023-04-01",
      $lte: "2023-06-30"
    }
  },
  {
    _id: 0,
    produto: 1,
    quantidade: 1,
    precoUnitario: 1,
    dataVenda: 1
  }
)

// 9.1 R: 
  nome: 'Diana Lorentz',
  cargo: 'Web Developer Senior',
  salario: 9790
}
{
  nome: 'Adam Fripp',
  cargo: 'Gerente de Estoque',
  salario: 9800
}
{
  nome: 'Payam Kaufling',
  cargo: 'Vendas',
  salario: 9600
}
{
  nome: 'Shanta Vollman',
  cargo: 'Gerente de Estoque',
  salario: 9700
}
{
  nome: 'Sarah Bell',
  cargo: 'Consultor de Vendas',
  salario: 7900
}
{
  nome: 'Britney Everett',
  cargo: 'Consultor de Vendas',
  salario: 7600
}
{
  nome: 'Alexa Green',
  cargo: 'Consultor de Vendas',
  salario: 6000
}
{
  nome: 'Kelly Chung',
  cargo: 'Consultor de Vendas',
  salario: 6000
}
{
  nome: 'Jenny Tseng',
  cargo: 'Consultor de Vendas',
  salario: 6000
}
{
  nome: 'Michael Hartstein',
  cargo: 'Consultor de Vendas',
  salario: 6000
}
{
  nome: 'Jon Deegan',
  cargo: 'Consultor de Vendas',
  salario: 6000
}
{
  nome: 'Sundar Ande',
  cargo: 'Consultor de Vendas',
  salario: 6000
}

db.funcionarios.find(
{
  salario: {
    $gte: 6000,
    $lte: 10000
  }
},
{
  _id: 0,
  nome: 1,
  cargo: 1,
  salario: 1
})

// 9.2 R: A Opção A é a mais eficiente, porque realiza todo o filtro no servidor MongoDB, reduzindo a quantidade de documentos processados e transferidos pela rede. Além disso, ela pode utilizar índices compostos (departamento + salario), enquanto a Opção B faz parte da filtragem na aplicação, aumentando o custo de processamento e o consumo de recursos.

// 9.3 R:
{
  nome: 'Alexa Green',
  telefone: '515.127.4563'
}
{
  nome: 'Kelly Chung',
  telefone: '515.127.4564'
}
{
  nome: 'Jenny Tseng',
  telefone: '515.127.4565'
}
{
  nome: 'Michael Hartstein',
  telefone: '515.127.4566'
}
{
  nome: 'Jon Deegan',
  telefone: '515.127.4567'
}
{
  nome: 'Sundar Ande',
  telefone: '515.127.4568'
}

db.funcionarios.find(
{
  $or: [
    { email: { $exists: false } },
    { email: null },
    { telefone: { $exists: false } },
    { telefone: null }
  ]
},
{
  _id: 0,
  nome: 1,
  email: 1,
  telefone: 1
})

// 9.4 R: 
{
  nome: 'Elisabeth Braddock',
  cargo: 'CEO',
  departamento: 'Executivo',
  salario: 71000
}
{
  nome: 'Bruce Ernst',
  cargo: 'Senior Web Developer',
  departamento: 'Inovações',
  salario: 5000
}
{
  nome: 'Alexander Hunold',
  cargo: 'Web Developer',
  departamento: 'Inovações',
  salario: 3500
}
{
  nome: 'Den Raphaely',
  cargo: 'Gerente de Recursos',
  departamento: 'Recursos Humanos',
  salario: 12500
}
{
  nome: 'Normam Osborn',
  cargo: 'Gerente de Recursos Químicos',
  departamento: 'Recursos Humanos',
  salario: 18080
}
{
  nome: 'Carol',
  cargo: 'Desenvolvedor',
  departamento: 'Tecnologia',
  salario: 5940.000000000001
}
{
  nome: 'Diana Lorentz',
  cargo: 'Web Developer Senior',
  departamento: 'Tecnologia',
  salario: 9790
}
{
  nome: 'Pat Ferreira',
  cargo: 'Representante de Vendas para a América Latina',
  departamento: 'Vendas',
  salario: 34000
}
{
  nome: 'Payam Kaufling',
  cargo: 'Vendas',
  departamento: 'Vendas',
  salario: 9600
}

db.funcionarios.aggregate([
  {
    $group: {
      _id: {
        departamento: "$departamento",
        cargo: "$cargo"
      },
      quantidade: { $sum: 1 },
      funcionario: { $first: "$$ROOT" }
    }
  },
  {
    $match: {
      quantidade: 1
    }
  },
  {
    $lookup: {
      from: "departamentos",
      localField: "_id.departamento",
      foreignField: "_id",
      as: "departamento"
    }
  },
  {
    $unwind: "$departamento"
  },
  {
    $project: {
      _id: 0,
      nome: "$funcionario.nome",
      cargo: "$funcionario.cargo",
      departamento: "$departamento.nome",
      salario: "$funcionario.salario"
    }
  },
  {
    $sort: {
      departamento: 1,
      cargo: 1
    }
  }
])

// 9.5 R: 
{
  numeroEscritorios: 1,
  numeroDepartamentos: 2,
  numeroFuncionarios: 0,
  pais: 'ENG',
  receitaTotal: 189792.5
}
{
  numeroEscritorios: 1,
  numeroDepartamentos: 0,
  numeroFuncionarios: 0,
  pais: 'EQU',
  receitaTotal: 376486500
}
{
  numeroEscritorios: 1,
  numeroDepartamentos: 1,
  numeroFuncionarios: 10,
  pais: 'IRE',
  receitaTotal: 244242.5
}
{
  numeroEscritorios: 1,
  numeroDepartamentos: 5,
  numeroFuncionarios: 12,
  pais: 'USA',
  receitaTotal: 318888.75
}

db.escritorios.aggregate([
  {
    $lookup: {
      from: "departamentos",
      localField: "_id",
      foreignField: "escritorio",
      as: "departamentos"
    }
  },
  {
    $lookup: {
      from: "funcionarios",
      let: {
        departamentosIds: "$departamentos._id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$departamento", "$$departamentosIds"]
            }
          }
        }
      ],
      as: "funcionarios"
    }
  },
  {
    $project: {
      pais: 1,

      numeroDepartamentos: {
        $size: "$departamentos"
      },

      numeroFuncionarios: {
        $size: "$funcionarios"
      },

      custoSalarios: {
        $sum: "$funcionarios.salario"
      },

      custoSuprimentos: {
        $sum: {
          $map: {
            input: "$suprimentos",
            as: "sup",
            in: {
              $multiply: [
                "$$sup.quantidade",
                "$$sup.precoUnitario"
              ]
            }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: "$pais",

      numeroEscritorios: {
        $sum: 1
      },

      numeroDepartamentos: {
        $sum: "$numeroDepartamentos"
      },

      numeroFuncionarios: {
        $sum: "$numeroFuncionarios"
      },

      custoSalarios: {
        $sum: "$custoSalarios"
      },

      custoSuprimentos: {
        $sum: "$custoSuprimentos"
      }
    }
  },
  {
    $project: {
      _id: 0,
      pais: "$_id",
      numeroEscritorios: 1,
      numeroDepartamentos: 1,
      numeroFuncionarios: 1,

      receitaTotal: {
        $add: [
          "$custoSalarios",
          "$custoSuprimentos"
        ]
      }
    }
  },
  {
    $sort: {
      pais: 1
    }
  }
])

// 10.1 R: 
db.escritorios.insertOne({
  nome: "Momento Brasil",
  endereco: "Av. Paulista, 1000, São Paulo, SP, Brasil",
  telefone: "+55 11 4000-1234",
  pais: "BRA",
  suprimentos: [
    {
      produto: "Notebooks",
      quantidade: 20,
      precoUnitario: 4500
    },
    {
      produto: "Monitores",
      quantidade: 25,
      precoUnitario: 1200
    },
    {
      produto: "Headsets",
      quantidade: 30,
      precoUnitario: 150
    },
    {
      produto: "Cadeiras Ergonômicas",
      quantidade: 15,
      precoUnitario: 1800
    },
    {
      produto: "Kits de Papel A4",
      quantidade: 100,
      precoUnitario: 35
    }
  ]
})

// 10.2 R:
db.departamentos.insertOne({
  nome: "Operações LATAM",
  escritorio: ObjectId("6a271d167381f391c1aedb85")
})

// 10.3 R:
db.funcionarios.insertMany([
  {
    nome: "Carol",
    cargo: "Desenvolvedor",
    salario: 5940,
    dataAdmissao: "2026-06-08",
    departamento: ObjectId("6a271d6d7381f391c1aedb86")
  },
  {
    nome: "João Silva",
    cargo: "Analista de Operações",
    salario: 5000,
    dataAdmissao: "2026-06-08",
    departamento: ObjectId("6a271d6d7381f391c1aedb86")
  },
  {
    nome: "Maria Santos",
    cargo: "Coordenadora LATAM",
    salario: 7500,
    dataAdmissao: "2026-06-08",
    departamento: ObjectId("6a271d6d7381f391c1aedb86")
  },
  {
    nome: "Pedro Oliveira",
    cargo: "Especialista em Processos",
    salario: 6200,
    dataAdmissao: "2026-06-08",
    departamento: ObjectId("6a271d6d7381f391c1aedb86")
  },
  {
    nome: "Ana Costa",
    cargo: "Assistente de Operações",
    salario: 4500,
    dataAdmissao: "2026-06-08",
    departamento: ObjectId("6a271d6d7381f391c1aedb86")
  }
])

// 10.4 R: 
{
  _id: ObjectId('5f8b3f3f9b3e0b3b3c1e3e41'),
  nome: 'Umbrella Corp',
  pais: 'EQU',
  custoTotalSuprimentos: 376486500
}
{
  _id: ObjectId('5992103f9b3e0b3b3c1e3e40'),
  nome: 'Stark Industries',
  pais: 'ENG',
  custoTotalSuprimentos: 189792.5
}
{
  _id: ObjectId('6a271d167381f391c1aedb85'),
  nome: 'Momento Brasil',
  pais: 'BRA',
  custoTotalSuprimentos: 155000
}

db.escritorios.aggregate([
  {
    $project: {
      nome: 1,
      pais: 1,
      custoTotalSuprimentos: {
        $sum: {
          $map: {
            input: "$suprimentos",
            as: "sup",
            in: {
              $multiply: [
                "$$sup.quantidade",
                "$$sup.precoUnitario"
              ]
            }
          }
        }
      }
    }
  },
  {
    $sort: {
      custoTotalSuprimentos: -1
    }
  },
  {
    $limit: 3
  }
])

// 10.5 R:
{
  pais: 'EQU',
  escritorio: 'Umbrella Corp',
  produto: 'Folhas de Sulfito',
  quantidade: 500000,
  precoUnitario: 752.85,
  valorTotal: 376425000
}
{
  pais: 'ENG',
  escritorio: 'Stark Industries',
  produto: 'Luvas de Ferro (unitário)',
  quantidade: 143,
  precoUnitario: 50,
  valorTotal: 7150
}
{
  pais: 'BRA',
  escritorio: 'Momento Brasil',
  produto: 'Kits de Papel A4',
  quantidade: 100,
  precoUnitario: 35,
  valorTotal: 3500
}

db.escritorios.aggregate([
  {
    $unwind: "$suprimentos"
  },
  {
    $match: {
      "suprimentos.quantidade": { $gt: 50 }
    }
  },
  {
    $project: {
      _id: 0,
      escritorio: "$nome",
      pais: 1,
      produto: "$suprimentos.produto",
      quantidade: "$suprimentos.quantidade",
      precoUnitario: "$suprimentos.precoUnitario",
      valorTotal: {
        $multiply: [
          "$suprimentos.quantidade",
          "$suprimentos.precoUnitario"
        ]
      }
    }
  },
  {
    $sort: {
      valorTotal: -1
    }
  }
])

// 10.6 R: 
{
  quantidadeFuncionarios: 3,
  totalSalariosAfetados: 123080,
  economiaTotal: 24616
}

db.funcionarios.aggregate([
  {
    $match: {
      salario: { $gt: 15000 }
    }
  },
  {
    $group: {
      _id: null,
      quantidadeFuncionarios: { $sum: 1 },
      totalSalariosAfetados: { $sum: "$salario" },
      economiaTotal: {
        $sum: {
          $multiply: ["$salario", 0.20]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      quantidadeFuncionarios: 1,
      totalSalariosAfetados: 1,
      economiaTotal: {
        $round: ["$economiaTotal", 2]
      }
    }
  }
])

// 10.7 R:
{
  produto: 'Lança-Teias',
  quantidade: 3,
  precoUnitario: 237.19,
  dataVenda: '2023-07-13'
}

db.vendas.find(
{
  $or: [
    { vendedor: { $exists: false } },
    { vendedor: null }
  ]
},
{
  _id: 0,
  produto: 1,
  quantidade: 1,
  precoUnitario: 1,
  dataVenda: 1
})

// 10.8 R: 0
db.vendas.aggregate([
  {
    $match: {
      vendedor: { $exists: true }
    }
  },
  {
    $lookup: {
      from: "funcionarios",
      localField: "vendedor",
      foreignField: "_id",
      as: "funcionario"
    }
  },
  {
    $match: {
      "funcionario.0": { $exists: false }
    }
  }
])

// 10.9 R: 0
db.vendas.aggregate([
  {
    $group: {
      _id: "$produto",
      menorPreco: { $min: "$precoUnitario" },
      maiorPreco: { $max: "$precoUnitario" },
      quantidadeVendas: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      produto: "$_id",
      quantidadeVendas: 1,
      menorPreco: 1,
      maiorPreco: 1,
      variacaoPercentual: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: ["$maiorPreco", "$menorPreco"]
                  },
                  "$menorPreco"
                ]
              },
              100
            ]
          },
          2
        ]
      }
    }
  },
  {
    $match: {
      variacaoPercentual: { $gt: 10 }
    }
  },
  {
    $sort: {
      variacaoPercentual: -1
    }
  }
])

// 10.10 R:
db.funcionarios.aggregate([
  {
    $facet: {
      totalFuncionarios: [
        {
          $count: "valor"
        }
      ],

      custoTotalSalarios: [
        {
          $group: {
            _id: null,
            valor: { $sum: "$salario" }
          }
        }
      ],

      numeroDepartamentos: [
        {
          $lookup: {
            from: "departamentos",
            pipeline: [
              { $count: "valor" }
            ],
            as: "dados"
          }
        },
        {
          $project: {
            valor: { $arrayElemAt: ["$dados.valor", 0] }
          }
        },
        { $limit: 1 }
      ],

      numeroEscritorios: [
        {
          $lookup: {
            from: "escritorios",
            pipeline: [
              { $count: "valor" }
            ],
            as: "dados"
          }
        },
        {
          $project: {
            valor: { $arrayElemAt: ["$dados.valor", 0] }
          }
        },
        { $limit: 1 }
      ],

      receitaTotalVendas: [
        {
          $lookup: {
            from: "vendas",
            pipeline: [
              {
                $group: {
                  _id: null,
                  valor: {
                    $sum: {
                      $multiply: [
                        "$quantidade",
                        "$precoUnitario"
                      ]
                    }
                  }
                }
              }
            ],
            as: "dados"
          }
        },
        {
          $project: {
            valor: { $arrayElemAt: ["$dados.valor", 0] }
          }
        },
        { $limit: 1 }
      ],

      produtoMaisVendido: [
        {
          $lookup: {
            from: "vendas",
            pipeline: [
              {
                $group: {
                  _id: "$produto",
                  quantidadeVendida: {
                    $sum: "$quantidade"
                  }
                }
              },
              {
                $sort: {
                  quantidadeVendida: -1
                }
              },
              {
                $limit: 1
              }
            ],
            as: "dados"
          }
        },
        {
          $project: {
            produto: {
              $arrayElemAt: ["$dados._id", 0]
            },
            quantidadeVendida: {
              $arrayElemAt: [
                "$dados.quantidadeVendida",
                0
              ]
            }
          }
        },
        { $limit: 1 }
      ]
    }
  },
  {
    $project: {
      totalFuncionarios: {
        $arrayElemAt: [
          "$totalFuncionarios.valor",
          0
        ]
      },
      custoTotalSalarios: {
        $arrayElemAt: [
          "$custoTotalSalarios.valor",
          0
        ]
      },
      numeroDepartamentos: {
        $arrayElemAt: [
          "$numeroDepartamentos.valor",
          0
        ]
      },
      numeroEscritorios: {
        $arrayElemAt: [
          "$numeroEscritorios.valor",
          0
        ]
      },
      receitaTotalVendas: {
        $arrayElemAt: [
          "$receitaTotalVendas.valor",
          0
        ]
      },
      produtoMaisVendido: {
        $arrayElemAt: [
          "$produtoMaisVendido.produto",
          0
        ]
      },
      quantidadeProdutoMaisVendido: {
        $arrayElemAt: [
          "$produtoMaisVendido.quantidadeVendida",
          0
        ]
      }
    }
  }
])
