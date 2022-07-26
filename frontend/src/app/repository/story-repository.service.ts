import {Injectable} from '@angular/core';
import {PagingAndSortingRepository} from "../service/http/repository/paging-and-sorting-repository";
import {Plan} from "../entity/plan";
import {PagingAndSortingRemoteRepositoryImpl} from "../service/http/repository/paging-and-sorting-remote-repository-impl";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StoryRepositoryService extends PagingAndSortingRemoteRepositoryImpl<Plan> implements PagingAndSortingRepository<Plan> {
  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getURL(method: any, methodArgs?: any): string {
    return "story";
  }
}
