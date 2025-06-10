
INSERT INTO pessoa (nome, cpf, email)
VALUES ('Administrador do Sistema', '000.000.000-00', 'admin@estacionamento.com')
ON CONFLICT (cpf) DO NOTHING;

INSERT INTO usuarios (id_pessoa, login, senha, role)
VALUES (
    (SELECT id FROM pessoa WHERE cpf = '000.000.000-00'),
    'admin',
    'hash_da_senha_admin', -- TROCAR PELA SENHA REAL EM HASH
    'admin'
)
ON CONFLICT (login) DO NOTHING;

INSERT INTO pessoa (nome, cpf, email)
VALUES ('Funcionário Padrão', '111.111.111-11', 'funcionario@estacionamento.com')
ON CONFLICT (cpf) DO NOTHING;
INSERT INTO usuarios (id_pessoa, login, senha, role)
VALUES (
    (SELECT id FROM pessoa WHERE cpf = '111.111.111-11'),
    'funcionario',
    'hash_da_senha_funcionario', -- TROCAR PELA SENHA REAL EM HASH
    'funcionario'
)
ON CONFLICT (login) DO NOTHING;