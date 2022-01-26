import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map,mergeMap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-book-newedit',
  templateUrl: './admin-book-newedit.component.html',
  styleUrls: ['./admin-book-newedit.component.css']
})
export class AdminBookNeweditComponent implements OnInit {

  constructor(private bookService: BookService,private router: Router,private activatedRoute: ActivatedRoute,
    private categoryService : CategoryService) { }

    formData : FormData;
    bookId : string;
    book : Book;
    bookForm : FormGroup;
    title : string;
    btnText : string;
    type:string;
    categories : Category[];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result=>{
      this.categories = result;
    });
    this.bookId = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.bookId == null) {
      this.title = "Kitap Ekleme";
      this.btnText = "Ekle";
      this.type = "add";
    }else {
      this.title = "Kitap Güncelleme"
      this.btnText = "Güncelle";
      this.type = "update";
      this.bookService.getBookById(this.bookId).subscribe(result=>{
        this.book = result;
        this.bookForm.controls['title'].setValue(this.book.title);
        this.bookForm.controls['author'].setValue(this.book.author);
        this.bookForm.controls['price'].setValue(this.book.price);
        this.bookForm.controls['stock'].setValue(this.book.stock);
        this.bookForm.controls['picture'].setValue(this.book.picture);
        this.bookForm.controls['categoryBy'].setValue(this.book.categoryBy);
      });

    }

    this.bookForm = new FormGroup({
      title : new FormControl("",Validators.required),
      author : new FormControl("",Validators.required),
      price : new FormControl("",Validators.required),
      stock : new FormControl("",Validators.required),
      picture : new FormControl(""),
      categoryBy : new FormControl("")
    });



  }


  upload(files){
    let fileData = files.target.files[0];
    this.formData = new FormData();
    this.formData.append("picture",fileData);
  }

  onSubmit(){
    if(this.bookForm.valid){
      if(this.type == "add"){
        this.bookService.saveBookImage(this.formData).pipe(map(result =>{
          this.bookForm.controls["picture"].setValue(result.url);
        }),
        mergeMap(()=>this.bookService.addBook(this.bookForm.value))
        ).subscribe(result =>{
          this.router.navigateByUrl("/admin");
        });
      }else{
        if(this.formData==null){
          this.bookService.updateBook(this.bookId,this.bookForm.value)
            .subscribe(result =>{
              this.router.navigateByUrl("/admin");
            });
        }else{
          
            this.bookService.saveBookImage(this.formData).pipe(map(result =>{
              this.bookForm.controls["picture"].setValue(result.url);
            }),
            mergeMap(()=>this.bookService.updateBook(this.bookId,this.bookForm.value))
            ).subscribe(result =>{
              this.router.navigateByUrl("/admin");
            });
        }
      }
    }
  }

  displayCategoryName(category : Category){
    return category.name;
  }
}
