import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCachorroComponent } from './criar-cachorro.component';

describe('CriarCachorroComponent', () => {
  let component: CriarCachorroComponent;
  let fixture: ComponentFixture<CriarCachorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarCachorroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarCachorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
