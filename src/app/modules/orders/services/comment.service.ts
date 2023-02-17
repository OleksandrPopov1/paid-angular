import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IComment} from "../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getById(id: number): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(`${urls.orders.orders}/${id}/comments`);
  };

  addNewComment(comment: IComment, id: number): Observable<IComment> {
    return this.httpClient.post<IComment>(`${urls.orders.orders}/${id}/comments`, comment);
  };
}
