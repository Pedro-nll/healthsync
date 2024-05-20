package com.pedroNll.HealthSync.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedroNll.HealthSync.models.Post;
import com.pedroNll.HealthSync.repositories.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post findById(Long id){
        Optional<Post> post = this.postRepository.findById(id);
        return post.orElseThrow(() -> new RuntimeException());
    }

    public List<Post> findAllPosts(){
        List<Post> posts = this.postRepository.findAll();
        return posts;
    }

    public List<Post> getNullPE(){
        List<Post> posts = this.postRepository.findAllByAvaliadorPEIsNull();
        return posts;
    }

    public List<Post> getNullNutri(){
        List<Post> posts = this.postRepository.findAllByAvaliadorNutriIsNull();
        return posts;
    }

    @Transactional
    public Post create(Post obj){
        Post newObj = new Post();
        newObj.setAutorCliente(obj.getAutorCliente());
        newObj.setAutorNutri(obj.getAutorNutri());
        newObj.setAutorPE(obj.getAutorPE());
        newObj.setAvaliadorNutri(obj.getAvaliadorNutri());
        newObj.setAvaliadorPE(obj.getAvaliadorPE());
        newObj.setCategoria(obj.getCategoria());
        newObj.setConteudo(obj.getConteudo());
        newObj.setSubTitulo(obj.getSubTitulo());
        newObj.setTitulo(obj.getTitulo());
        obj = this.postRepository.save(newObj);
        return obj;
    }

    @Transactional
    public Post avaliarPost(Post obj){
        Post newObj = findById(obj.getId());
        newObj.setComentarios(obj.getComentarios());
        newObj.setPostAceito(obj.getPostAceito());
        newObj.setAvaliadorNutri(obj.getAvaliadorNutri());
        newObj.setAvaliadorPE(obj.getAvaliadorPE());
        return this.postRepository.save(newObj);
    }

    @Transactional
    public Post atualizarPost(Post obj){
        Post newObj = findById(obj.getId());
        newObj.setPostAceito(obj.getPostAceito());
        newObj.setCategoria(obj.getCategoria());
        newObj.setConteudo(obj.getConteudo());
        newObj.setTitulo(obj.getTitulo());
        newObj.setSubTitulo(obj.getSubTitulo());
        return this.postRepository.save(newObj);
    }
}
