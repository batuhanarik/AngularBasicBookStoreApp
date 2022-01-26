import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private bookService: BookService) { }
  books: Book[];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns : string[] = ["no","picture","title","author","price","stock","categoryName","action"];
  ngOnInit(): void {

    this.bookService.getBooks().subscribe(result => {
      this.books = result;
      this.books.forEach((book,index)=>{
        this.books[index]["no"]=index+1;
        
        this.dataSource = new MatTableDataSource<Book>(this.books);
        this.dataSource.paginator = this.paginator;
        
      })
    })




  }

}
