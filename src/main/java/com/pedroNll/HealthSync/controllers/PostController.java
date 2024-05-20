package com.pedroNll.HealthSync.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pedroNll.HealthSync.models.Post;
import com.pedroNll.HealthSync.services.PostService;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Post obj){
        this.postService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").
        buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/avaliarPost")
    public ResponseEntity<Void> avaliarPost(@RequestBody Post obj){
        this.postService.avaliarPost(obj);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizarPost")
    public ResponseEntity<Void> atualizarPost(@RequestBody Post obj){
        this.postService.atualizarPost(obj);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> obj = this.postService.findAllPosts();
        return ResponseEntity.ok().body(obj); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> findById(@PathVariable Long id){
        Post obj = this.postService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/nullNutricionista")
    public ResponseEntity<List<Post>> getNullNutri(){
        List<Post> obj = this.postService.getNullNutri();
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/nullProfissional")
    public ResponseEntity<List<Post>> getNullPE(){
        List<Post> obj = this.postService.getNullPE();
        return ResponseEntity.ok().body(obj);
    }
}
