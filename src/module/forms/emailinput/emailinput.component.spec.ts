import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioEmailInputComponent } from './emailinput.component';

describe('amexio-email-input' , () => {
  let comp: AmexioEmailInputComponent;
  let fixture: ComponentFixture<AmexioEmailInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioEmailInputComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioEmailInputComponent);
    comp = fixture.componentInstance;
  });

  it('check private variable innerValue empty', () => {
    expect((<any>comp).innerValue).toBe('');
  });

  // it('check private method onChangeCallback()', () => {
  //  // expect((<any>comp).onChangeCallback()).toEqual(noop);
  // });

  it('check private variable showToolTip boolean', () => {
    expect((<any>comp).showToolTip).toEqual(false);
  });

  it('conditions check of the onBlank', () => {
    comp.onBlank({'touched': true});
    (<any>comp).innerValue = null;
    expect((<any>comp).innerValue).toEqual(null);
   (<any>comp).innerValue = '';
   expect((<any>comp).innerValue).toEqual('');
   expect(comp.isValid).toEqual(jasmine.any(Boolean));
  });


  it('condition check value is null or empty in onBlank method', () => {
    comp.onBlank({'touched': true});
    (<any>comp).value = '';
     expect((<any>comp).value).toEqual('');
     (<any>comp).value = null;
     expect((<any>comp).value).toEqual(null);
  });


  it('onfocus method check boolean value  showtooltip is true', () => {
    comp.onFocus();
    expect((<any>comp).showToolTip).toEqual(true);
  });


  it('onfocus method writevalue method call', () => {
    comp.writeValue('value');
    (<any>comp).innerValue = '';
    expect((<any>comp).innerValue).not.toEqual('value');
  });

// it('conditions check of the validateClasses', () => {
//     comp.validateClasses('value');
//     (<any>comp).allowblank = 'value';
//    expect(comp.allowblank).toEqual(false);
//   });

it('set errormsg', () => {
  comp.errormsg='data incorect';
        expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
    });

    it('get errormsg', () => {
    //  comp.errormsg='data incorect';
            expect(comp.errormsg).toEqual(comp._errormsg);
        });

//get pattern
it('get pattern', () => {
expect(comp.pattern).toEqual(comp._pattern);
})

//set pattern
// it('set pattern', () => {

//   let obj = new RegExp(comp.pattern);
//   expect(comp.value).not.toEqual(null);
//   expect(comp.regEx).toEqual(obj);
//  })

it('register on change', () => {
let fn: any;
comp.registerOnChange(fn);
expect(comp['onChangeCallback']).toEqual(fn);
});


it('register on touched', () => {
let fn: any;
comp.registerOnTouched(fn);
expect(comp['onTouchedCallback']).toEqual(fn);
});

it('getCssClass()', () => {
  comp.getCssClass();
  expect(comp.getCssClass).toBeUndefined;
  });

 
});