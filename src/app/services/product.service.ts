import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/product'


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product

    );
  }

  
  updateProduct(id: number, product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

//INYECTABLE Indica que angular puede utilizar esta clase mediante su
//sistema de inyeccion de dependencias 