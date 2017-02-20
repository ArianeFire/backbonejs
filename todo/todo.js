var app = {};

//My Todo Model
app.Todo = Backbone.Model.extend({

	default: {
		title: "Unspecified",
		completed: false
	}

});

//My Todo Collection
app.TodoCollection = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Store("todo-store-")
});

app.todos = new app.TodoCollection();

//Todo Application View 

app.TodoAppView = Backbone.View.extend({

	el: '#todoapp',

	initialize: function(){
		this.input = $("#new-todo");
		app.todos.on("add", this.addOne, this);
	},

	events: {
		"keypress #new-todo": "createTodoOnEnter"
	},

	createTodoOnEnter: function(e){

		if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      		return;
    	}

    	app.todos.create(this.newAttributes());
    	this.input.val('');
	},

	addOne: function(todo){
		var view = new app.TodoView({model: todo});
		//$('#todo-list').append(view);
		$('#todo-list').append(view.render().el);
	},

	render: function(){

	},

	newAttributes: function(){
    	return {
      		title: this.input.val().trim(),
      		completed: false
    	}
    }

});

app.TodoView = Backbone.View.extend({

	tagName: 'li',

	template: _.template($("#item-template").html()),

	initialize: function(){
		console.log(this.model.get("title"));
		this.model.on("change", this.render, this);
	},

	events:{
		"click .toggle": "completed",
		"dblclick label": "edit",
		"keypress .edit": "updateOnEnter"
	},

	edit: function(){
		this.input.css("display", "block");
	},

	updateOnEnter: function(e){

		if(e.which !== 13 || !this.input.val().trim()){
			return;
		}

		this.model.set("title", this.input.val().trim());
		this.input.css("display", "none");
	},

	completed: function(){
		console.log("Title : "+this.model.get("title")+" checked");
		this.model.set("completed", true);
		this.model.save();
		//app.todos.where({title:this.model.get("title")}).set("completed", true);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.input = $(".edit");
		return this;
	}

});

view = new app.TodoAppView();

console.log("Hello world");

$(function(){

});