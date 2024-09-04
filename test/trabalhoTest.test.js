const GerenciadorDeTarefas = require('../src/Trabalho01Turma01.js');

describe('GerenciadorDeTarefas', () => {
    let gerenciador;
    let tarefaExemplo;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
        tarefaExemplo = { id: 1, descricao: 'Tarefa de exemplo', concluida: false, data: '2023-09-04', prioridade: 2 };
    });

    test('adicionarTarefa deve adicionar uma tarefa válida', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        expect(gerenciador.contarTarefas()).toBe(1);
    });

    test('adicionarTarefa deve lançar erro para tarefa com descrição curta', () => {
        expect(() => {
            gerenciador.adicionarTarefa({ id: 2, descricao: 'ok' });
        }).toThrow('Erro ao cadastrar tarefa');
    });

    test('removerTarefa deve remover tarefa pelo ID', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        gerenciador.removerTarefa(1);
        expect(gerenciador.contarTarefas()).toBe(0);
    });

    test('buscarTarefaPorId deve retornar a tarefa correta', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        const tarefa = gerenciador.buscarTarefaPorId(1);
        expect(tarefa).toEqual(tarefaExemplo);
    });

    test('marcarTarefaComoConcluida deve marcar a tarefa como concluída', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        gerenciador.marcarTarefaComoConcluida(1);
        const tarefa = gerenciador.buscarTarefaPorId(1);
        expect(tarefa.concluida).toBe(true);
    });

    test('listarTarefasConcluidas deve listar apenas tarefas concluídas', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        gerenciador.marcarTarefaComoConcluida(1);
        const concluidas = gerenciador.listarTarefasConcluidas();
        expect(concluidas.length).toBe(1);
        expect(concluidas[0].concluida).toBe(true);
    });

    test('atualizarTarefa deve atualizar a tarefa corretamente', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        gerenciador.atualizarTarefa(1, { descricao: 'Tarefa Atualizada' });
        const tarefa = gerenciador.buscarTarefaPorId(1);
        expect(tarefa.descricao).toBe('Tarefa Atualizada');
    });

    test('ordenarTarefasPorPrioridade deve ordenar tarefas pela prioridade', () => {
        gerenciador.adicionarTarefa(tarefaExemplo);
        gerenciador.adicionarTarefa({ id: 2, descricao: 'Outra tarefa', prioridade: 1 });
        gerenciador.ordenarTarefasPorPrioridade();
        const tarefas = gerenciador.listarTarefas();
        expect(tarefas[0].prioridade).toBe(1);
        expect(tarefas[1].prioridade).toBe(2);
    });

    const GerenciadorDeTarefas = require('./Trabalho01Turma01');

    describe('GerenciadorDeTarefas', () => {
        let gerenciador;
        let tarefaExemplo;

        beforeEach(() => {
            gerenciador = new GerenciadorDeTarefas();
            tarefaExemplo = { id: 1, descricao: 'Tarefa de exemplo', concluida: false, data: '2023-09-04', prioridade: 2 };
        });

        // Teste para listarTarefas
        test('listarTarefas deve retornar todas as tarefas', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            const tarefas = gerenciador.listarTarefas();
            expect(tarefas.length).toBe(1);
            expect(tarefas[0]).toEqual(tarefaExemplo);
        });

        // Teste para listarTarefasPendentes
        test('listarTarefasPendentes deve listar apenas tarefas pendentes', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.marcarTarefaComoConcluida(1);
            gerenciador.adicionarTarefa({ id: 2, descricao: 'Outra tarefa', concluida: false });
            const pendentes = gerenciador.listarTarefasPendentes();
            expect(pendentes.length).toBe(1);
            expect(pendentes[0].concluida).toBe(false);
        });

        // Teste para removerTarefasConcluidas
        test('removerTarefasConcluidas deve remover todas as tarefas concluídas', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.marcarTarefaComoConcluida(1);
            gerenciador.removerTarefasConcluidas();
            expect(gerenciador.contarTarefas()).toBe(0);
        });

        // Teste para buscarTarefaPorDescricao
        test('buscarTarefaPorDescricao deve retornar tarefas que incluem a descrição', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            const tarefas = gerenciador.buscarTarefaPorDescricao('exemplo');
            expect(tarefas.length).toBe(1);
            expect(tarefas[0]).toEqual(tarefaExemplo);
        });

        // Teste para adicionarTagATarefa
        test('adicionarTagATarefa deve adicionar uma tag à tarefa', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.adicionarTagATarefa(1, 'Urgente');
            const tarefa = gerenciador.buscarTarefaPorId(1);
            expect(tarefa.tags).toContain('Urgente');
        });

        // Teste para removerTagDaTarefa
        test('removerTagDaTarefa deve remover a tag da tarefa', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.adicionarTagATarefa(1, 'Urgente');
            gerenciador.removerTagDaTarefa(1, 'Urgente');
            const tarefa = gerenciador.buscarTarefaPorId(1);
            expect(tarefa.tags).not.toContain('Urgente');
        });

        // Teste para listarTarefasPorTag
        test('listarTarefasPorTag deve listar tarefas com a tag específica', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.adicionarTagATarefa(1, 'Urgente');
            const tarefas = gerenciador.listarTarefasPorTag('Urgente');
            expect(tarefas.length).toBe(1);
            expect(tarefas[0]).toEqual(tarefaExemplo);
        });

        // Teste para buscarTarefasPorData
        test('buscarTarefasPorData deve retornar tarefas com a data específica', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            const tarefas = gerenciador.buscarTarefasPorData('2023-09-04');
            expect(tarefas.length).toBe(1);
            expect(tarefas[0]).toEqual(tarefaExemplo);
        });

        // Teste para atualizarPrioridade
        test('atualizarPrioridade deve atualizar a prioridade da tarefa', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.atualizarPrioridade(1, 1);
            const tarefa = gerenciador.buscarTarefaPorId(1);
            expect(tarefa.prioridade).toBe(1);
        });

        // Teste para listarTarefasPorPrioridade
        test('listarTarefasPorPrioridade deve listar tarefas com a prioridade específica', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            const tarefas = gerenciador.listarTarefasPorPrioridade(2);
            expect(tarefas.length).toBe(1);
            expect(tarefas[0]).toEqual(tarefaExemplo);
        });

        // Teste para contarTarefasPorPrioridade
        test('contarTarefasPorPrioridade deve contar o número de tarefas com a prioridade específica', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            const count = gerenciador.contarTarefasPorPrioridade(2);
            expect(count).toBe(1);
        });

        // Teste para marcarTodasComoConcluidas
        test('marcarTodasComoConcluidas deve marcar todas as tarefas como concluídas', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.adicionarTarefa({ id: 2, descricao: 'Outra tarefa', concluida: false });
            gerenciador.marcarTodasComoConcluidas();
            expect(gerenciador.listarTarefasPendentes().length).toBe(0);
        });

        // Teste para reabrirTarefa
        test('reabrirTarefa deve marcar a tarefa como não concluída', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.marcarTarefaComoConcluida(1);
            gerenciador.reabrirTarefa(1);
            const tarefa = gerenciador.buscarTarefaPorId(1);
            expect(tarefa.concluida).toBe(false);
        });

        // Teste para ordenarTarefasPorData
        test('ordenarTarefasPorData deve ordenar tarefas pela data', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.adicionarTarefa({ id: 2, descricao: 'Outra tarefa', data: '2023-09-03' });
            gerenciador.ordenarTarefasPorData();
            const tarefas = gerenciador.listarTarefas();
            expect(tarefas[0].data).toBe('2023-09-03');
            expect(tarefas[1].data).toBe('2023-09-04');
        });

        // Teste para ordenarTarefasPorPrioridade
        test('ordenarTarefasPorPrioridade deve ordenar tarefas pela prioridade', () => {
            gerenciador.adicionarTarefa(tarefaExemplo);
            gerenciador.adicionarTarefa({ id: 2, descricao: 'Outra tarefa', prioridade: 1 });
            gerenciador.ordenarTarefasPorPrioridade();
            const tarefas = gerenciador.listarTarefas();
            expect(tarefas[0].prioridade).toBe(1);
            expect(tarefas[1].prioridade).toBe(2);
        });
    });
});
