package vn.phantruongan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.phantruongan.backend.domain.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

}
