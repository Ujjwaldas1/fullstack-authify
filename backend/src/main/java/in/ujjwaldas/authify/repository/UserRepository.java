package in.ujjwaldas.authify.repository;

import in.ujjwaldas.authify.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);


    Boolean existsByEmail(String email);


}
