import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.treino.deleteMany();
  await prisma.membro.deleteMany();
  await prisma.plano.deleteMany();

  // Criar planos de academia
  const planoBasico = await prisma.plano.create({
    data: {
      nome: 'Plano Básico',
      descricao: 'Acesso à academia nos horários normais',
      preco: 89.90,
      duracaoDias: 30
    }
  });

  const planoPremium = await prisma.plano.create({
    data: {
      nome: 'Plano Premium',
      descricao: 'Acesso ilimitado + aulas em grupo',
      preco: 149.90,
      duracaoDias: 30
    }
  });

  const planoVip = await prisma.plano.create({
    data: {
      nome: 'Plano VIP',
      descricao: 'Acesso total + personal trainer',
      preco: 299.90,
      duracaoDias: 30
    }
  });

  // Criar membros (alunos)
  const julio = await prisma.membro.create({
    data: {
      nome: 'Julio Balestrin',
      email: 'julio.balestrin@email.com',
      telefone: '(11) 99999-9999',
      dataNascimento: new Date('1985-05-15'),
      planoId: planoPremium.id
    }
  });

  const leo = await prisma.membro.create({
    data: {
      nome: 'Leo Stronda',
      email: 'leo.stronda@email.com',
      telefone: '(11) 88888-8888',
      dataNascimento: new Date('1990-08-20'),
      planoId: planoBasico.id
    }
  });

  const carlao = await prisma.membro.create({
    data: {
      nome: 'Carlao',
      email: 'carlao@email.com',
      telefone: '(11) 77777-7777',
      dataNascimento: new Date('1978-12-10'),
      planoId: planoVip.id
    }
  });

  // Criar treinos (aulas agendadas)
  await prisma.treino.create({
    data: {
      nome: 'Musculação - Superior',
      descricao: 'Treino de peito, ombros e tríceps',
      duracao: 60,
      dificuldade: 'Avançado',
      membroId: julio.id
    }
  });

  await prisma.treino.create({
    data: {
      nome: 'Aula de Yoga',
      descricao: 'Yoga para iniciantes',
      duracao: 45,
      dificuldade: 'Iniciante',
      membroId: leo.id
    }
  });

  await prisma.treino.create({
    data: {
      nome: 'Personal Training',
      descricao: 'Treino personalizado completo',
      duracao: 75,
      dificuldade: 'Avançado',
      membroId: carlao.id
    }
  });

  await prisma.treino.create({
    data: {
      nome: 'Aeróbico - Esteira',
      descricao: 'Cardio para queima de gordura',
      duracao: 30,
      dificuldade: 'Intermediário',
      membroId: julio.id
    }
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📊 Criados:`);
  console.log(`   - ${await prisma.plano.count()} planos`);
  console.log(`   - ${await prisma.membro.count()} membros`);
  console.log(`   - ${await prisma.treino.count()} treinos`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });