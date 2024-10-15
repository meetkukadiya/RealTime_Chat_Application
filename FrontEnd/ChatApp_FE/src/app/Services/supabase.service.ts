// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private apiUrl = '/api/register'; 

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string, username: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password, username });
  }


}
