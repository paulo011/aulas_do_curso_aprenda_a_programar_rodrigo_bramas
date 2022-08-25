
create schema financas_pessoais;

create table financas_pessoais.lancamento(
    id_lancamento serial primary key,
    mes text,
    categoria text,
    tipo text,
    valor numeric
);

