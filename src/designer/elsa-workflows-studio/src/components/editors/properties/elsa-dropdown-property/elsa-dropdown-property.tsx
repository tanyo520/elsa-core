import { Component, h, Prop, State } from '@stencil/core';
import {
  ActivityDefinitionProperty, ActivityModel,
  ActivityPropertyDescriptor,
  RuntimeSelectListProviderSettings,
  SelectList,
  SelectListItem,
  SyntaxNames
} from "../../../../models";
import Tunnel from "../../../../data/workflow-editor";
import { getSelectListItems } from "../../../../utils/select-list-items";

@Component({
  tag: 'elsa-dropdown-property',
  shadow: false,
})
export class ElsaDropdownProperty {

  @Prop() activityModel: ActivityModel;
  @Prop() propertyDescriptor: ActivityPropertyDescriptor;
  @Prop() propertyModel: ActivityDefinitionProperty;
  @Prop({ mutable: true }) serverUrl: string;
  @State() currentValue?: string;

  selectList: SelectList = { items: [], isFlagsEnum: false };

  async componentWillLoad() {
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || undefined;
    this.selectList = await getSelectListItems(this.serverUrl, this.propertyDescriptor);

    if (this.currentValue == undefined) {
      const firstOption : any = this.selectList.items[0];

      if (firstOption) {
        const optionIsObject = typeof (firstOption) == 'object';
        this.currentValue = optionIsObject ? firstOption.value : firstOption.toString();
      }
    }
  }

  onChange(e: Event) {
    const select = (e.target as HTMLSelectElement);
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.propertyModel.expressions[defaultSyntax] = this.currentValue = select.value;
  }

  onDefaultSyntaxValueChanged(e: CustomEvent) {
    this.currentValue = e.detail;
  }

  render() {

    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    let currentValue = this.currentValue;
    const { items } = this.selectList;

    if (currentValue == undefined) {
      const defaultValue = this.propertyDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }

    return (
      <elsa-property-editor
        activityModel={this.activityModel}
        propertyDescriptor={propertyDescriptor}
        propertyModel={propertyModel}
        onDefaultSyntaxValueChanged={e => this.onDefaultSyntaxValueChanged(e)}
        single-line={true}>
        <select id={fieldId} name={fieldName} onChange={e => this.onChange(e)}
          class="elsa-mt-1 elsa-block focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-w-full elsa-shadow-sm sm:elsa-max-w-xs sm:elsa-text-sm elsa-border-gray-300 elsa-rounded-md">
          {items.map(item => {
            const optionIsObject = typeof (item) == 'object';
            const value = optionIsObject ? item.value : item.toString();
            const text = optionIsObject ? item.text : item.toString();
            return <option value={value} selected={value === currentValue}>{text}</option>;
          })}
        </select>
      </elsa-property-editor>
    );
  }
}

Tunnel.injectProps(ElsaDropdownProperty, ['serverUrl']);
