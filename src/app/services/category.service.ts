import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  apiUrl: string = `${environment.baseUrl}/category`;

  addCategory(category: Category) {
    return this.httpClient.post<any>(this.apiUrl, category);
  }

  updateCategory(categoryId: string, category: Category) : Observable<Category> {
    return this.httpClient.put<any>(`${this.apiUrl}/${categoryId}`,category);
  }

  deleteCategory(categoryId : string) : Observable<Category> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${categoryId}`);
  }

  getCategoryById(id:string){
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`).pipe(map(result => result.data));
  }

  getCategories() : Observable<Category[]> {
    return this.httpClient.get<any>(this.apiUrl).pipe(map(result => result.data));
  }
}
