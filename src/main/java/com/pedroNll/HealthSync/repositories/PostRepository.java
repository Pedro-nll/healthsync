package com.pedroNll.HealthSync.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedroNll.HealthSync.models.Post;


@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
    List<Post> findAll();
    List<Post> findAllByAvaliadorNutriIsNull();
    List<Post> findAllByAvaliadorPEIsNull();
}
