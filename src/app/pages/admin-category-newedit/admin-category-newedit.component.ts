import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category-newedit',
  templateUrl: './admin-category-newedit.component.html',
  styleUrls: ['./admin-category-newedit.component.css']
})
export class AdminCategoryNeweditComponent implements OnInit {

  constructor(private categoryService: CategoryService,private router:Router,private activatedRoute: ActivatedRoute) { }
  categoryId : string
  category : Category
  categoryForm : FormGroup
  title : string
  btnText : string
  type : string

  
  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.categoryId == null){
      this.title = 'Kategori Ekle';
      this.btnText = 'Ekle';
      this.type = "add";
    }else{
      this.title = "Kategori Güncelle";
      this.btnText = "Güncelle"
      this.type = "update";
      this.categoryService.getCategoryById(this.categoryId)
      .subscribe(result => {
        this.category = result;

        this.categoryForm.controls['name'].setValue(this.category.name);
      });
    }

    this.categoryForm = new FormGroup({
      name:new FormControl("",Validators.required)
    });

  }
  
  onSubmit(){
    if(this.categoryForm.valid){
      if(this.type == "add"){
        this.categoryService.addCategory(this.categoryForm.value).subscribe(result =>{
          this.router.navigateByUrl("/admin");

        });
      }else{
        this.categoryService.updateCategory(this.categoryId,this.categoryForm.value).subscribe(result=>{
          this.router.navigateByUrl("/admin");          
        })
      }
    }
  }
  

}
