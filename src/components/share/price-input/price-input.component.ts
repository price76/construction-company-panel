import { Component, EventEmitter, Output } from '@angular/core';
import { PriceHelper } from 'src/helper/priceHelper';

@Component(
	{
		selector: 'price-input',
		templateUrl: './price-input.component.html',
		styleUrls: ['./price-input.component.css']
	}
)

export class PriceInputComponent
	{

		@Output() setPrice = new EventEmitter<any>();

		price:number = 0;

		constructor(
			private priceHelper: PriceHelper
		){}

		onChanged
		(
			target:any
		):void
			{
				this.setPrice.emit(this.price);
			}

		getPriceInString
		():string
			{
				return this.priceHelper.priceToWord(
					this.price
				)
			}
	}
