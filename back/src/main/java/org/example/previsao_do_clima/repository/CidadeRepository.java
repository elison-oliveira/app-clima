package org.example.previsao_do_clima.repository;

import org.example.previsao_do_clima.domain.entity.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, String> {
    Optional<Cidade> findFirstByNomeIgnoreCase(String nome);
}