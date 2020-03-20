let oneExpense = function (id, name, color, description, amount){
    this.id = id;
    this.name = name,
    this.color = color,
    this.description = description;
    this.amount = amount;
}
oneExpense.prototype.getId = ()=>this.id;
oneExpense.prototype.setId = (id)=>{this.id = id;}
oneExpense.prototype.getName = ()=>this.name;
oneExpense.prototype.setName = (name)=>{this.name = name;}
oneExpense.prototype.getColor = ()=>this.color;
oneExpense.prototype.setColor = (color)=>{this.color = color;}
oneExpense.prototype.getDescription = ()=>this.description;
oneExpense.prototype.setDescription = (description)=>{this.description = description;}
oneExpense.prototype.getAmount = ()=>this.amount;
oneExpense.prototype.setAmount = (amount)=>{this.amount = amount;}

export default oneExpense;