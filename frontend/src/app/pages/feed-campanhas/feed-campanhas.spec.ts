import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCampanhas } from './feed-campanhas';

describe('FeedCampanhas', () => {
  let component: FeedCampanhas;
  let fixture: ComponentFixture<FeedCampanhas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedCampanhas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedCampanhas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
