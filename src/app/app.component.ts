import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FileUploadComponent],
  template: `<app-file-upload></app-file-upload>`,
})
export class AppComponent {
  title = 'file-app';
}
