import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  selectedZipFile: File | null = null;
  uploadUrl = 'http://localhost:3000/upload'; // For multipart/form-data
  uploadZipUrl = 'http://localhost:3000/upload1'; // For JSON base64

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  onZipFileSelected(event: any) {
    this.selectedZipFile = event.target.files[0] || null;
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(this.uploadUrl, formData).subscribe({
      next: (response) => console.log('Upload successful:', response),
      error: (error) => console.error('Upload error:', error),
    });
  }

  uploadZipFile() {
    if (!this.selectedZipFile) {
      alert('Please select a .zip file first.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedZipFile);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Extracting base64 data
      const requestBody = {
        fileName: this.selectedZipFile?.name,
        fileData: base64String,
      };

      this.http.post(this.uploadZipUrl, requestBody).subscribe({
        next: (response) => console.log('Zip upload successful:', response),
        error: (error) => console.error('Zip upload error:', error),
      });
    };

    reader.onerror = (error) => {
      console.error('Error converting file to Base64:', error);
    };
  }
}
