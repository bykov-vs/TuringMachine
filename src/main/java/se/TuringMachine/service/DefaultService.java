package se.TuringMachine.service;

import java.util.List;

public interface DefaultService<T> {
    void save(T t);

    T find(Long id);

    List<T> findAll();

    T delete(Long id);

    T delete(T t);
}