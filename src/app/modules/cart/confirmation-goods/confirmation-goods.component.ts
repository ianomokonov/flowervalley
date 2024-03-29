import { Component, Input } from '@angular/core';
import { CartService } from '../../../_services/front/cart.service';
import { BoxGenerateService } from '../../../_services/front/box-generate.service';
import { DestroyService } from '../../../_services/front/destroy.service';
import { takeUntil } from 'rxjs';
import { ProductItem } from '../../../_models/product-item';
import { HtmlToPdfService } from '../../../_services/front/html-to-pdf.service';
import { PriceConverterPipe } from '../../../_pipes/price-converter.pipe';
import { BoxItem } from '../../../_models/box-item';

@Component({
  selector: 'flower-valley-confirmation-goods',
  templateUrl: './confirmation-goods.component.html',
  styleUrls: ['./confirmation-goods.component.scss'],
  providers: [DestroyService, HtmlToPdfService, PriceConverterPipe],
})
export class ConfirmationGoodsComponent {
  @Input()
  public goods: ProductItem[] = [];
  public boxes: BoxItem[] = [];
  @Input()
  public shippingCost = 0;
  @Input()
  public pickUp: boolean = false;
  constructor(
    private cartService: CartService,
    private boxService: BoxGenerateService,
    private htmlToPDF: HtmlToPdfService,
    private priceConvert: PriceConverterPipe,
    $destroy: DestroyService,
  ) {
    this.boxService
      .getBoxes()
      .pipe(takeUntil($destroy))
      .subscribe((boxes) => {
        this.boxes = boxes;
      });
  }

  public increaseCount(item: ProductItem) {
    item.count++;
    this.cartService.updateCount(item);
  }

  public decreaseCount(item: ProductItem) {
    if (item.count <= 1) return;
    item.count--;
    this.cartService.updateCount(item);
  }

  public changeCount(item: ProductItem, count: number): void {
    if (count <= 1) count = 1;
    item.count = count;
    this.cartService.updateCount(item);
  }

  public get getSum(): number {
    let sum = 0;
    this.goods.map((item) => (sum += item.price * item.count));
    return sum;
  }

  public get getBoxesSum(): number {
    let sum = 0;
    this.boxes.map((box) => (sum += box.count * box.price));
    return sum;
  }

  public get getBoxesCount(): number {
    let sum = 0;
    this.boxes.map((box) => (sum += box.count));
    return sum;
  }

  public getInvoice(): void {
    this.htmlToPDF.getPDF(
      ['Товар', 'Цена', 'Количество', 'Стоимость'],
      this.goods.map((goods) => [goods.name, goods.price, goods.count, goods.price * goods.count]),
      this.priceConvert.transform(this.shippingCost, 'two', 'rub'),
      this.priceConvert.transform(this.getBoxesSum, 'two', 'rub'),
      this.priceConvert.transform(this.getSum, 'two', 'rub'),
      this.priceConvert.transform(this.getSum + this.getBoxesSum + this.shippingCost, 'two', 'rub'),
    );
  }
}
