INSERT INTO VAGAS (tipo) VALUES 
('COMUM'), ('COMUM'), ('IDOSO'), ('DEFICIENTE')
ON CONFLICT DO NOTHING;

INSERT INTO CARROS (placa, modelo, cor, vaga_id) VALUES 
('ABC1D23', 'Fiat Uno', 'Vermelho', 1),
('XYZ9E87', 'Honda Civic', 'Prata', 2)
ON CONFLICT (placa) DO NOTHING;