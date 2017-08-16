import { Injectable, Component } from '@angular/core';
import { TanahProvider } from '../../providers/tanah/tanah';
import { Tanah } from '../../models/tanah';

@Injectable()
export class TanahService {
  tanahs: Tanah[] = [];

  constructor(private dataStore: TanahProvider){}
}