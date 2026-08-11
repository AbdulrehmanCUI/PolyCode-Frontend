// PolyCode — Ruby on Rails course (Beginner → Advanced)

const ACCENT = "#cc0000";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return {
      type: "text",
      content,
      code: { lang: "ruby", ...codeBlock },
    };
  }
  return { type: "text", content };
}

export const RUBY_ON_RAILS_CHAPTERS = [
  {
    id: "rails-intro",
    title: "Introduction to Ruby on Rails — Beginner",
    stage: "beginner",
    icon: "🚂",
    color: ACCENT,
    lessons: [
      {
        id: "rails-0",
        title: "What is Ruby on Rails?",
        xp: 10,
        theory: [
          text(
            "Ruby on Rails (often called Rails) is a web application framework written in Ruby. It follows the MVC (Model-View-Controller) architectural pattern and emphasizes Convention Over Configuration (CoC) and Don't Repeat Yourself (DRY) principles."
          ),
          text(
            "Rails is built on Ruby, so if you know Ruby basics, you're ready to learn Rails. Rails handles the boilerplate of web development — routing, database access, sessions, caching — so you can focus on building features."
          ),
          callout(
            "info",
            "Course level: Beginner to Advanced — each chapter builds on the previous. Examples simulate Rails patterns in pure Ruby so they run in the browser-backed interpreter."
          ),
        ],
        challenge: {
          title: "Rails Concept Check",
          description: "Create a class that simulates a Rails-like router. It should have a `match` method that registers a route and a `route_for` method that finds a registered route. Return the route path string.",
          starterCode: `# Simulate a simple Rails-like router
class Router
  def initialize
    @routes = {}
  end

  def match(path, controller, action)
    # Register a route
  end

  def route_for(path)
    # Return route info
  end
end

router = Router.new
router.match("/users", "UsersController", "index")
puts router.route_for("/users")`,
          solutionCode: `class Router
  def initialize
    @routes = {}
  end

  def match(path, controller, action)
    @routes[path] = { controller: controller, action: action }
  end

  def route_for(path)
    route = @routes[path]
    return "Route not found" unless route
    "#{route[:controller]}##{route[:action]}"
  end
end

router = Router.new
router.match("/users", "UsersController", "index")
puts router.route_for("/users")`,
          tests: [
            { id: 1, label: "Has match method", keywords: [{ pattern: "def match" }] },
            { id: 2, label: "Has route_for method", keywords: [{ pattern: "def route_for" }] },
            { id: 3, label: "Returns controller#action", keywords: [{ pattern: "UsersController" }] },
          ],
        },
      },
      {
        id: "rails-1",
        title: "MVC Architecture",
        xp: 12,
        theory: [
          text(
            "MVC separates concerns: Model handles data and business logic, View handles presentation, and Controller coordinates between them. In Rails, this maps to app/models, app/views, and app/controllers.",
            {
              label: "MVC simulation in Ruby",
              content: `# Simulating Rails MVC structure
# Model: represents data
class Article
  attr_accessor :title, :body

  def initialize(title, body)
    @title = title
    @body = body
  end

  def summary
    "#{@title}: #{@body[0..50]}..."
  end
end

# View: presents data
class ArticleView
  def render(article)
    puts "=== #{article.title} ==="
    puts article.body
    puts "---"
  end
end

# Controller: coordinates
class ArticlesController
  def index
    articles = [
      Article.new("Rails Intro", "Ruby on Rails is a powerful framework."),
      Article.new("MVC Pattern", "Model-View-Controller separates concerns."),
    ]
    view = ArticleView.new
    articles.each { |a| view.render(a) }
  end
end

ArticlesController.new.index`,
            },
          ),
          quiz(
            "In Rails MVC, which component handles database operations?",
            ["View", "Controller", "Model", "Router"],
            2,
            "The Model handles data and business logic, including database operations through Active Record."
          ),
        ],
        challenge: {
          title: "MVC Todo App",
          description: "Create a Todo model with `title` and `done` attributes, a TodoView that renders todos with [x] or [ ] prefix, and a TodosController with an `index` action that shows all todos.",
          starterCode: `# Implement MVC for a Todo app
class Todo
  # attr_accessor :title, :done
  # def initialize(title); end
end

class TodoView
  # def render(todos); end
end

class TodosController
  def index
    # Create todos and render them
  end
end

TodosController.new.index`,
          solutionCode: `class Todo
  attr_accessor :title, :done

  def initialize(title)
    @title = title
    @done = false
  end
end

class TodoView
  def render(todos)
    todos.each do |todo|
      mark = todo.done ? "[x]" : "[ ]"
      puts "#{mark} #{todo.title}"
    end
  end
end

class TodosController
  def index
    todos = [
      Todo.new("Learn Rails"),
      Todo.new("Build app"),
    ]
    view = TodoView.new
    view.render(todos)
  end
end

TodosController.new.index`,
          tests: [
            { id: 1, label: "Has Todo class", keywords: [{ pattern: "class Todo" }] },
            { id: 2, label: "Has TodoView", keywords: [{ pattern: "class TodoView" }] },
            { id: 3, label: "Has TodosController", keywords: [{ pattern: "class TodosController" }] },
          ],
        },
      },
    ],
  },

  {
    id: "rails-routes-controllers",
    title: "Routes & Controllers — Beginner",
    stage: "beginner",
    icon: "🛣️",
    color: "#dc2626",
    lessons: [
      {
        id: "rails-2",
        title: "Rails Routing Basics",
        xp: 14,
        theory: [
          text(
            "Rails routing maps URLs to controller actions. The routes.rb file defines these mappings. Rails uses RESTful conventions: GET, POST, PUT/PATCH, DELETE map to index, show, create, update, destroy.",
            {
              label: "Rails routing simulation",
              content: `# Simulating Rails routes
class RailsRouter
  def initialize(&block)
    @routes = { get: [], post: [], put: [], patch: [], delete: [] }
    instance_eval(&block) if block_given?
  end

  def get(path, to:)
    controller, action = to.split("#")
    @routes[:get] << { path: path, controller: controller, action: action }
  end

  def resources(name)
    get "/#{name}", to: "#{name}_controller#index"
    get "/#{name}/:id", to: "#{name}_controller#show"
    post "/#{name}", to: "#{name}_controller#create"
    put "/#{name}/:id", to: "#{name}_controller#update"
    delete "/#{name}/:id", to: "#{name}_controller#destroy"
  end

  def recognize_path(method, path)
    @routes[method.to_sym]&.find { |r| r[:path] == path }
  end
end

router = RailsRouter.new do
  get "/", to: "pages#home"
  resources :articles
end

route = router.recognize_path("get", "/articles")
puts "Controller: #{route[:controller]}, Action: #{route[:action]}"`,
            },
          ),
          callout("tip", "Use `rails routes` in terminal to see all available routes in your Rails app."),
        ],
        challenge: {
          title: "RESTful Router",
          description: "Create a `resources` method that generates all 7 RESTful routes for a given resource name. The routes should be stored in a routes array and printed.",
          starterCode: `# Implement a RESTful resources method
class RESTRouter
  def initialize
    @routes = []
  end

  def get(path, controller_action)
    @routes << { method: "GET", path: path, to: controller_action }
  end

  def resources(name)
    # Generate all 7 RESTful routes
    # GET    /name          -> index
    # GET    /name/:id       -> show
    # GET    /name/new       -> new
    # GET    /name/:id/edit  -> edit
    # POST   /name           -> create
    # PUT    /name/:id       -> update
    # DELETE /name/:id       -> destroy
  end

  def print_routes
    @routes.each { |r| puts "#{r[:method].ljust(6)} #{r[:path]}" }
  end
end

router = RESTRouter.new
router.resources(:posts)
router.print_routes`,
          solutionCode: `class RESTRouter
  def initialize
    @routes = []
  end

  def get(path, controller_action)
    @routes << { method: "GET", path: path, to: controller_action }
  end

  def post(path, controller_action)
    @routes << { method: "POST", path: path, to: controller_action }
  end

  def put(path, controller_action)
    @routes << { method: "PUT", path: path, to: controller_action }
  end

  def delete(path, controller_action)
    @routes << { method: "DELETE", path: path, to: controller_action }
  end

  def resources(name)
    get "/#{name}", "#{name}_controller#index"
    get "/#{name}/:id", "#{name}_controller#show"
    get "/#{name}/new", "#{name}_controller#new"
    get "/#{name}/:id/edit", "#{name}_controller#edit"
    post "/#{name}", "#{name}_controller#create"
    put "/#{name}/:id", "#{name}_controller#update"
    delete "/#{name}/:id", "#{name}_controller#destroy"
  end

  def print_routes
    @routes.each { |r| puts "#{r[:method].ljust(6)} #{r[:path]}" }
  end
end

router = RESTRouter.new
router.resources(:posts)
router.print_routes`,
          tests: [
            { id: 1, label: "Generates index route", keywords: [{ pattern: "/posts" }] },
            { id: 2, label: "Generates 7 routes", keywords: [{ pattern: "DELETE" }] },
            { id: 3, label: "Uses resources method", keywords: [{ pattern: "def resources" }] },
          ],
        },
      },
      {
        id: "rails-3",
        title: "Controller Actions & Params",
        xp: 14,
        theory: [
          text(
            "Controllers handle incoming requests and return responses. The `params` hash contains request data. Strong parameters protect against mass assignment. Flash messages provide one-time notifications.",
            {
              label: "Controller simulation",
              content: `# Simulating Rails controller
class RailsController
  attr_accessor :request, :response, :params, :flash

  def initialize
    @flash = {}
    @response = {}
  end

  def params
    @params ||= {}
  end

  def redirect_to(url)
    @response[:redirect] = url
    puts "Redirecting to: #{url}"
  end

  def render(view_name, locals: {})
    @response[:view] = view_name
    puts "Rendering: #{view_name}"
    puts "Locals: #{locals}"
  end
end

class PostsController < RailsController
  def index
    @posts = ["Post 1", "Post 2", "Post 3"]
    render "posts/index", locals: { posts: @posts }
  end

  def show
    id = params[:id]
    @post = "Post #{id}"
    render "posts/show", locals: { post: @post }
  end

  def create
    title = params[:post]&.dig(:title) || "Untitled"
    flash[:notice] = "Post created: #{title}"
    redirect_to "/posts"
  end
end

# Simulate requests
req1 = PostsController.new
req1.params[:id] = 42
req1.show

puts "---"
req2 = PostsController.new
req2.params[:post] = { title: "Hello Rails" }
req2.create
puts "Flash: #{req2.flash}"`,
            },
          ),
        ],
        challenge: {
          title: "Secure Controller",
          description: "Create a UsersController with `index`, `show`, and `create` actions. Use strong parameters pattern to filter allowed fields. The `create` action should only accept `name` and `email`, not `role`.",
          starterCode: `# Implement a controller with strong parameters
class ApplicationController
  def params
    @params ||= {}
  end
end

class UsersController < ApplicationController
  private

  def user_params
    # Filter params to only allow :name and :email
  end

  public

  def create
    filtered = user_params
    puts "Creating user with: #{filtered}"
    { name: filtered[:name], email: filtered[:email] }
  end
end

# Test it
controller = UsersController.new
controller.params[:user] = { name: "Alice", email: "alice@example.com", role: "admin" }
result = controller.create
puts "Result: #{result}"`,
          solutionCode: `class ApplicationController
  def params
    @params ||= {}
  end
end

class UsersController < ApplicationController
  private

  def user_params
    params[:user]&.slice(:name, :email) || {}
  end

  public

  def create
    filtered = user_params
    puts "Creating user with: #{filtered}"
    { name: filtered[:name], email: filtered[:email] }
  end
end

controller = UsersController.new
controller.params[:user] = { name: "Alice", email: "alice@example.com", role: "admin" }
result = controller.create
puts "Result: #{result}"`,
          tests: [
            { id: 1, label: "Has user_params method", keywords: [{ pattern: "def user_params" }] },
            { id: 2, label: "Filters allowed fields", keywords: [{ pattern: "slice" }] },
            { id: 3, label: "Excludes role", keywords: [{ pattern: "role" }] },
          ],
        },
      },
    ],
  },
  {
    id: "rails-models",
    title: "Active Record & Models — Intermediate",
    stage: "intermediate",
    icon: "🗄️",
    color: "#ea580c",
    lessons: [
      {
        id: "rails-4",
        title: "Active Record Basics",
        xp: 16,
        theory: [
          text(
            "Active Record is Rails' ORM (Object-Relational Mapping) layer. It maps database tables to Ruby classes. Common methods: `all`, `find`, `create`, `update`, `destroy`, `where`.",
            {
              label: "Active Record simulation",
              content: `# Simulating Active Record with a simple in-memory store
class SimpleRecord
  @@connection = {}
  @@id_counter = 0

  class << self
    def table_name
      name.downcase + "s"
    end

    def all
      (@@connection[table_name] || []).map { |attrs| new(attrs) }
    end

    def find(id)
      record = (@@connection[table_name] || []).find { |r| r[:id] == id }
      raise "Couldn't find #{name} with id=#{id}" unless record
      new(record)
    end

    def where(conditions)
      results = (@@connection[table_name] || []).select do |r|
        conditions.all? { |k, v| r[k] == v }
      end
      results.map { |attrs| new(attrs) }
    end

    def create(attributes)
      record = new(attributes)
      record.save
      record
    end

    def reset_db
      @@connection[table_name] = []
      @@id_counter = 0
    end
  end

  attr_accessor :id, :attributes

  def initialize(attrs = {})
    @attributes = attrs.dup
    @id = attrs[:id]
  end

  def save
    return update(@attributes) if @id
    @@id_counter += 1
    @id ||= @@id_counter
    @attributes[:id] = @id
    @@connection[self.class.table_name] ||= []
    @@connection[self.class.table_name] << @attributes.dup
    true
  end

  def update(attrs = {})
    @attributes.merge!(attrs)
    @@connection[self.class.table_name]&.each do |r|
      r.merge!(@attributes) if r[:id] == @id
    end
    true
  end

  def destroy
    @@connection[self.class.table_name]&.delete_if { |r| r[:id] == @id }
    true
  end

  def method_missing(m, *args, &block)
    if @attributes.key?(m)
      @attributes[m]
    elsif m.to_s.end_with?("=")
      attr = m.to_s.chomp("=").to_sym
      @attributes[attr] = args.first
    else
      super
    end
  end

  def respond_to_missing?(m, include_private = false)
    @attributes.key?(m.to_s.chomp("=").to_sym) || super
  end
end

class Post < SimpleRecord
end

# Use it
Post.reset_db
post = Post.create(title: "Hello Rails", body: "Rails is great!")
puts "Created: #{post.title} (id: #{post.id})"

all_posts = Post.all
puts "Total posts: #{all_posts.size}"

found = Post.find(post.id)
puts "Found: #{found.title}"

Post.create(title: "Second Post", body: "More content")
puts "Posts with 'Hello': #{Post.where(title: 'Hello Rails').size}"`,
            },
          ),
          quiz(
            "Which Active Record method finds records by a specific id?",
            ["where", "find", "search", "filter"],
            1,
            "`find` retrieves a single record by its primary key (id)."
          ),
        ],
        challenge: {
          title: "Article CRUD",
          description: "Create an Article model with title and body attributes. Implement CRUD operations: create 3 articles, find one by id, update one, and count remaining after deleting one.",
          starterCode: `# Implement Article model with CRUD operations
class Article < SimpleRecord
end

# Reset database
Article.reset_db

# Create 3 articles
# Find article with id 2
# Update article 1's title
# Delete article 3
# Print remaining count`,
          solutionCode: `class Article < SimpleRecord
end

Article.reset_db

a1 = Article.create(title: "Rails Basics", body: "Learn the fundamentals")
a2 = Article.create(title: "Active Record", body: "ORM in Rails")
a3 = Article.create(title: "Views", body: "ERB templates")

found = Article.find(a2.id)
puts "Found: #{found.title}"

a1.title = "Rails Fundamentals"
a1.save

a3.destroy

remaining = Article.all.size
puts "Remaining articles: #{remaining}"`,
          tests: [
            { id: 1, label: "Creates articles", keywords: [{ pattern: "Article\\.create" }] },
            { id: 2, label: "Finds article", keywords: [{ pattern: "Article\\.find" }] },
            { id: 3, label: "Deletes article", keywords: [{ pattern: "destroy" }] },
          ],
        },
      },
      {
        id: "rails-5",
        title: "Associations & Validations",
        xp: 16,
        theory: [
          text(
            "Active Record associations define relationships between models: `has_many`, `has_one`, `belongs_to`, and `has_and_belongs_to_many`. Validations ensure data integrity before saving.",
            {
              label: "Associations simulation",
              content: `# Simulating Rails-style associations
class Author
  attr_accessor :id, :name

  @@all = []

  def initialize(attrs = {})
    @id = attrs[:id]
    @name = attrs[:name]
  end

  def save
    @@all << self
    true
  end

  def articles
    Article.all.select { |a| a.author_id == @id }
  end

  def self.all
    @@all
  end
end

class Article
  attr_accessor :id, :title, :author_id

  @@all = []

  def initialize(attrs = {})
    @id = attrs[:id]
    @title = attrs[:title]
    @author_id = attrs[:author_id]
  end

  def save
    @@all << self
    true
  end

  def author
    Author.all.find { |a| a.id == @author_id }
  end

  def self.all
    @@all
  end
end

# Create author and articles
author = Author.new(id: 1, name: "Sarah")
author.save

a1 = Article.new(id: 1, title: "Rails Intro", author_id: 1)
a2 = Article.new(id: 2, title: "Active Record", author_id: 1)
a1.save
a2.save

puts "Author: #{author.name}"
puts "Articles: #{author.articles.map(&:title).join(", ")}"`,
            },
          ),
          callout("tip", "Always validate at the model level — never trust user input. Use `presence`, `uniqueness`, `format`, and `length` validators."),
        ],
        challenge: {
          title: "Validated User Model",
          description: "Create a User model with validations: name must be present, email must be present and match a valid email format, and password must be at least 8 characters. Create a `valid?` method that checks all validations.",
          starterCode: `# Implement User model with validations
class User
  attr_accessor :name, :email, :password

  def initialize(attrs = {})
    @name = attrs[:name]
    @email = attrs[:email]
    @password = attrs[:password]
    @errors = []
  end

  def valid?
    @errors = []
    # Check name presence
    # Check email presence and format
    # Check password length (min 8)
    @errors.empty?
  end

  def errors
    @errors
  end
end

# Test cases
u1 = User.new(name: "Alice", email: "alice@example.com", password: "secret123")
puts "Valid user: #{u1.valid?}"

u2 = User.new(name: "", email: "bad", password: "short")
puts "Invalid user: #{u2.valid?}"
puts "Errors: #{u2.errors.join(", ")}"`,
          solutionCode: `class User
  attr_accessor :name, :email, :password

  def initialize(attrs = {})
    @name = attrs[:name]
    @email = attrs[:email]
    @password = attrs[:password]
    @errors = []
  end

  def valid?
    @errors = []
    @errors << "Name can't be blank" if @name.nil? || @name.strip.empty?
    if @email.nil? || @email.strip.empty?
      @errors << "Email can't be blank"
    elsif @email !~ /^[\\w.+-]+@[\\w.-]+\\.[a-z]{2,}$/i
      @errors << "Email is invalid"
    end
    if @password.nil? || @password.length < 8
      @errors << "Password is too short (minimum is 8 characters)"
    end
    @errors.empty?
  end

  def errors
    @errors
  end
end

u1 = User.new(name: "Alice", email: "alice@example.com", password: "secret123")
puts "Valid user: #{u1.valid?}"

u2 = User.new(name: "", email: "bad", password: "short")
puts "Invalid user: #{u2.valid?}"
puts "Errors: #{u2.errors.join(", ")}"`,
          tests: [
            { id: 1, label: "Validates name presence", keywords: [{ pattern: "Name" }] },
            { id: 2, label: "Validates email format", keywords: [{ pattern: "Email" }] },
            { id: 3, label: "Validates password length", keywords: [{ pattern: "password" }] },
          ],
        },
      },
    ],
  },

  {
    id: "rails-views",
    title: "Views & Forms — Intermediate",
    stage: "intermediate",
    icon: "🎨",
    color: "#16a34a",
    lessons: [
      {
        id: "rails-6",
        title: "ERB Templates & Layouts",
        xp: 14,
        theory: [
          text(
            "ERB (Embedded Ruby) allows Ruby code in HTML. Use `<% %>` for logic and `<%= %>` for output. Layouts wrap views with common elements like headers and footers.",
            {
              label: "ERB simulation",
              content: `require 'erb'
require 'ostruct'

# Simulate a view template
template = <<~ERB
  <h1><%= @article.title %></h1>
  <p>By <%= @author.name %></p>
  <div class="body"><%= @article.body %></div>
  <% if @article.published %>
    <span class="badge">Published</span>
  <% else %>
    <span class="badge draft">Draft</span>
  <% end %>
ERB

# Simulate data
@article = OpenStruct.new(title: "Rails Views", body: "ERB lets you embed Ruby in HTML.", published: true)
@author = OpenStruct.new(name: "Sarah")

# Render
renderer = ERB.new(template)
result = renderer.result(binding)

puts result`,
            },
          ),
          callout("info", "In real Rails, views go in app/views/controller_name/action_name.html.erb. Use partials (`render 'shared/header'`) for reusable components."),
        ],
        challenge: {
          title: "ERB Article List",
          description: "Use ERB to render a list showing only published articles with their titles.",
          starterCode: `require 'erb'

articles = [
  { title: "Rails", published: true },
  { title: "Draft Post", published: false },
  { title: "Active Record", published: true },
]

template = <<~TPL
  <ul>
  <% articles.each do |article| %>
    <% if article[:published] %>
      <li><%= article[:title] %></li>
    <% end %>
  <% end %>
  </ul>
TPL

# Render the template using ERB and print the result
`,
          solutionCode: `require 'erb'

articles = [
  { title: "Rails", published: true },
  { title: "Draft Post", published: false },
  { title: "Active Record", published: true },
]

template = <<~TPL
  <ul>
  <% articles.each do |article| %>
    <% if article[:published] %>
      <li><%= article[:title] %></li>
    <% end %>
  <% end %>
  </ul>
TPL

puts ERB.new(template).result(binding)`,
          tests: [
            { id: 1, label: "Requires erb", keywords: [{ pattern: "require 'erb'" }] },
            { id: 2, label: "Uses ERB.new", keywords: [{ pattern: "ERB\\.new" }] },
            { id: 3, label: "Filters published articles", keywords: [{ pattern: "published" }] },
          ],
        },
      },
      {
        id: "rails-7",
        title: "Form Helpers & CSRF",
        xp: 14,
        theory: [
          text(
            "Rails form helpers generate HTML forms with proper attributes. `form_with` is the modern helper. CSRF protection uses authenticity tokens to prevent cross-site request forgery.",
            {
              label: "Form helper simulation",
              content: `require 'securerandom'

# Simulating Rails form_with helper
class FormBuilder
  def initialize(scope, url, options = {})
    @scope = scope
    @url = url
    @authenticity_token = options[:authenticity_token] || SecureRandom.hex(16)
    @html = []
  end

  def text_field(method, options = {})
    value = @scope && @scope.respond_to?(method) ? @scope.send(method) : ""
    @html << "<input type=\\"text\\" name=\\"#{method}\\" value=\\"#{value}\\" />"
    self
  end

  def submit(value = "Submit")
    @html << "<input type=\\"submit\\" value=\\"#{value}\\" />"
    self
  end

  def to_html
    <<~HTML
      <form action="#{@url}" method="post">
        <input type="hidden" name="authenticity_token" value="#{@authenticity_token}" />
        #{@html.join("\\n")}
      </form>
    HTML
  end
end

def form_with(scope: nil, url:, **options)
  builder = FormBuilder.new(scope, url, options)
  yield(builder) if block_given?
  builder.to_html
end

# Usage
class UserForm
  attr_accessor :name, :email
end

user = UserForm.new
user.name = "Alice"
user.email = "alice@example.com"

html = form_with(scope: user, url: "/users") do |f|
  f.text_field(:name)
  f.text_field(:email)
  f.submit("Create User")
end

puts html`,
            },
          ),
          callout("warning", "Always include CSRF tokens in forms. Rails does this automatically with form helpers. Never disable CSRF protection unless you have a specific reason."),
        ],
        challenge: {
          title: "Secure Form Builder",
          description: "Create a form builder that generates a complete HTML form with CSRF token, text fields for name and email, and a submit button. The form should POST to /users.",
          starterCode: `require 'securerandom'

# Create a secure form builder
class SecureFormBuilder
  def initialize(url)
    @url = url
    @fields = []
  end

  def text_field(name, value = "")
    @fields << { type: "text", name: name, value: value }
    self
  end

  def email_field(name, value = "")
    @fields << { type: "email", name: name, value: value }
    self
  end

  def submit(text = "Submit")
    @fields << { type: "submit", value: text }
    self
  end

  def to_html
    # Generate complete form with CSRF token
  end
end

form = SecureFormBuilder.new("/users")
form.text_field("user[name]", "Alice")
form.email_field("user[email]", "alice@example.com")
form.submit("Create")
puts form.to_html`,
          solutionCode: `require 'securerandom'

class SecureFormBuilder
  def initialize(url)
    @url = url
    @fields = []
    @csrf_token = SecureRandom.hex(16)
  end

  def text_field(name, value = "")
    @fields << { type: "text", name: name, value: value }
    self
  end

  def email_field(name, value = "")
    @fields << { type: "email", name: name, value: value }
    self
  end

  def submit(text = "Submit")
    @fields << { type: "submit", value: text }
    self
  end

  def to_html
    field_html = @fields.map do |f|
      "<input type=\\"#{f[:type]}\\" name=\\"#{f[:name]}\\" value=\\"#{f[:value]}\\" />"
    end.join("\\n")

    <<~HTML
<form action="#{@url}" method="post">
  <input type="hidden" name="authenticity_token" value="#{@csrf_token}" />
  #{field_html}
</form>
    HTML
  end
end

form = SecureFormBuilder.new("/users")
form.text_field("user[name]", "Alice")
form.email_field("user[email]", "alice@example.com")
form.submit("Create")
puts form.to_html`,
          tests: [
            { id: 1, label: "Generates form tag", keywords: [{ pattern: "<form" }] },
            { id: 2, label: "Includes CSRF token", keywords: [{ pattern: "authenticity_token" }] },
            { id: 3, label: "Has submit button", keywords: [{ pattern: "submit" }] },
          ],
        },
      },
    ],
  },
  {
    id: "rails-auth",
    title: "Authentication & Authorization — Pro",
    stage: "pro",
    icon: "🔐",
    color: "#7e22ce",
    lessons: [
      {
        id: "rails-8",
        title: "User Authentication",
        xp: 18,
        theory: [
          text(
            "Authentication verifies who a user is. Rails apps commonly use `has_secure_password` with BCrypt for password hashing. Sessions store authenticated user IDs across requests. Here we simulate the hashing with a simple digest so it runs anywhere.",
            {
              label: "Authentication simulation",
              content: `require 'digest'

# Simulating Rails authentication with has_secure_password
class User
  attr_accessor :email, :password_digest

  def initialize(email:, password: nil)
    @email = email
    self.password = password if password
  end

  def password=(password)
    @password_digest = Digest::SHA256.hexdigest(password)
  end

  def authenticate(password)
    return false unless @password_digest
    Digest::SHA256.hexdigest(password) == @password_digest
  end
end

# Create users
alice = User.new(email: "alice@example.com", password: "secret123")
bob = User.new(email: "bob@example.com", password: "password")

# Test authentication
puts "Alice with correct password: #{alice.authenticate("secret123")}"
puts "Alice with wrong password: #{alice.authenticate("wrong")}"
puts "Bob: #{bob.authenticate("password")}"`,
            },
          ),
          callout("tip", "Use `has_secure_password` in real Rails apps. It automatically adds password confirmation, secure hashing with BCrypt, and authentication methods."),
        ],
        challenge: {
          title: "Session-based Auth",
          description: "Create an AuthSystem with User model (email + password_digest), a SessionStore that manages sessions with tokens, and a `login`/`logout`/`current_user` interface.",
          starterCode: `# Implement session-based authentication
class User
  attr_accessor :id, :email, :password_digest

  def initialize(id:, email:, password:)
    @id = id
    @email = email
    @password_digest = password
  end

  def authenticate(password)
    @password_digest == password
  end
end

class SessionStore
  def initialize
    @sessions = {}
  end

  def create(user)
    # Generate token, store user_id, return token
  end

  def destroy(token)
    # Remove session
  end

  def get_user(token)
    # Return user for token or nil
  end
end

class AuthSystem
  def initialize
    @users = []
    @sessions = SessionStore.new
  end

  def register_user(email, password)
    # Create user
  end

  def login(email, password)
    # Find user, authenticate, create session
  end

  def logout(token)
    # Destroy session
  end

  def current_user(token)
    # Get current user from token
  end
end

# Test
auth = AuthSystem.new
auth.register_user("alice@example.com", "secret123")
token = auth.login("alice@example.com", "secret123")
puts "Logged in as: #{auth.current_user(token)&.email}"`,
          solutionCode: `class User
  attr_accessor :id, :email, :password_digest

  def initialize(id:, email:, password:)
    @id = id
    @email = email
    @password_digest = password
  end

  def authenticate(password)
    @password_digest == password
  end
end

class SessionStore
  def initialize
    @sessions = {}
  end

  def create(user)
    token = "token_#{rand(10000)}"
    @sessions[token] = user.id
    token
  end

  def destroy(token)
    @sessions.delete(token)
  end

  def get_user(token)
    @sessions[token]
  end
end

class AuthSystem
  def initialize
    @users = []
    @sessions = SessionStore.new
    @next_id = 1
  end

  def register_user(email, password)
    user = User.new(id: @next_id, email: email, password: password)
    @users << user
    @next_id += 1
    user
  end

  def login(email, password)
    user = @users.find { |u| u.email == email }
    return nil unless user&.authenticate(password)
    token = @sessions.create(user)
    token
  end

  def logout(token)
    @sessions.destroy(token)
  end

  def current_user(token)
    user_id = @sessions.get_user(token)
    @users.find { |u| u.id == user_id }
  end
end

auth = AuthSystem.new
auth.register_user("alice@example.com", "secret123")
token = auth.login("alice@example.com", "secret123")
puts "Logged in as: #{auth.current_user(token)&.email}"`,
          tests: [
            { id: 1, label: "Has User class", keywords: [{ pattern: "class User" }] },
            { id: 2, label: "Has login method", keywords: [{ pattern: "def login" }] },
            { id: 3, label: "Has current_user method", keywords: [{ pattern: "current_user" }] },
          ],
        },
      },
      {
        id: "rails-9",
        title: "Authorization & Permissions",
        xp: 16,
        theory: [
          text(
            "Authorization determines what authenticated users can do. Use `before_action` filters and policy objects to enforce permissions. Never trust client-side checks alone.",
            {
              label: "Authorization simulation",
              content: `require 'ostruct'

class ApplicationController
  attr_accessor :current_user

  def initialize
    @current_user = nil
  end

  def authorize(action, resource)
    return true if allowed?(action, resource)
    raise "Unauthorized: #{action} on #{resource.class}"
  end

  def allowed?(action, resource)
    return false unless @current_user
    return true if @current_user[:role] == :admin
    return true if resource.respond_to?(:user_id) && resource.user_id == @current_user[:id]
    action == :read
  end

  def require_login
    raise "Login required" unless @current_user
  end
end

class PostsController < ApplicationController
  def destroy
    post = OpenStruct.new(id: 1, user_id: 42)
    authorize(:delete, post)
    puts "Post deleted!"
  end
end

# Test as regular user
user = { id: 42, role: :user }
controller = PostsController.new
controller.current_user = user
controller.destroy rescue puts "Blocked: #{$!}"

# Test as admin
admin = { id: 99, role: :admin }
controller.current_user = admin
controller.destroy`,
            },
          ),
          callout("warning", "Always authorize at the controller level AND at the model level. Use a policy class (like Pundit) for complex authorization logic."),
        ],
        challenge: {
          title: "Role-based Access Control",
          description: "Create a RoleBasedAccess class with `can?(user, action, resource)` method. Admins can do everything, editors can edit posts they own, viewers can only read. Test with different user roles.",
          starterCode: `# Implement role-based access control
class Post
  attr_accessor :id, :author_id, :title

  def initialize(id:, author_id:, title:)
    @id = id
    @author_id = author_id
    @title = title
  end
end

class RoleBasedAccess
  def can?(user, action, resource)
    # Admin: can do anything
    # Editor: can edit/delete their own posts, read all
    # Viewer: can only read
  end
end

access = RoleBasedAccess.new
admin = { id: 1, role: :admin }
editor = { id: 2, role: :editor }
viewer = { id: 3, role: :viewer }

post = Post.new(id: 1, author_id: 2, title: "Test Post")

puts "Admin can delete: #{access.can?(admin, :delete, post)}"
puts "Editor can delete own: #{access.can?(editor, :delete, post)}"
puts "Viewer can read: #{access.can?(viewer, :read, post)}"
puts "Viewer cannot delete: #{access.can?(viewer, :delete, post)}"`,
          solutionCode: `class Post
  attr_accessor :id, :author_id, :title

  def initialize(id:, author_id:, title:)
    @id = id
    @author_id = author_id
    @title = title
  end
end

class RoleBasedAccess
  def can?(user, action, resource)
    return false unless user

    case user[:role]
    when :admin
      true
    when :editor
      return true if action == :read
      return resource.author_id == user[:id] if [:edit, :delete].include?(action)
      false
    when :viewer
      action == :read
    else
      false
    end
  end
end

access = RoleBasedAccess.new
admin = { id: 1, role: :admin }
editor = { id: 2, role: :editor }
viewer = { id: 3, role: :viewer }

post = Post.new(id: 1, author_id: 2, title: "Test Post")

puts "Admin can delete: #{access.can?(admin, :delete, post)}"
puts "Editor can delete own: #{access.can?(editor, :delete, post)}"
puts "Viewer can read: #{access.can?(viewer, :read, post)}"
puts "Viewer cannot delete: #{access.can?(viewer, :delete, post)}"`,
          tests: [
            { id: 1, label: "Handles admin role", keywords: [{ pattern: ":admin" }] },
            { id: 2, label: "Handles editor role", keywords: [{ pattern: ":editor" }] },
            { id: 3, label: "Handles viewer role", keywords: [{ pattern: ":viewer" }] },
          ],
        },
      },
    ],
  },

  {
    id: "rails-apis",
    title: "REST APIs & JSON — Pro",
    stage: "pro",
    icon: "🔌",
    color: "#0ea5e9",
    lessons: [
      {
        id: "rails-10",
        title: "Building REST APIs",
        xp: 18,
        theory: [
          text(
            "Rails APIs return JSON instead of HTML. Use `render json:` to serialize data. Follow REST conventions: GET for reads, POST for creates, PUT/PATCH for updates, DELETE for removals.",
            {
              label: "API simulation",
              content: `require 'json'

class APIResponse
  def self.json(data, status: 200)
    {
      status: status,
      headers: { "Content-Type" => "application/json" },
      body: JSON.pretty_generate(data)
    }
  end

  def self.error(message, status: 400)
    json({ error: message }, status: status)
  end
end

class ArticlesController
  attr_accessor :params

  def initialize
    @articles = [
      { id: 1, title: "Rails API", body: "Building APIs with Rails", author: "Sarah" },
      { id: 2, title: "JSON", body: "JavaScript Object Notation", author: "Bob" },
    ]
    @params = {}
  end

  def index
    APIResponse.json({ articles: @articles, count: @articles.size })
  end

  def show
    article = @articles.find { |a| a[:id] == params[:id].to_i }
    return APIResponse.error("Not found", status: 404) unless article
    APIResponse.json({ article: article })
  end

  def create
    new_article = {
      id: @articles.size + 1,
      title: params[:title] || "Untitled",
      body: params[:body] || "",
      author: params[:author] || "Anonymous"
    }
    @articles << new_article
    APIResponse.json({ article: new_article }, status: 201)
  end
end

controller = ArticlesController.new
puts "=== INDEX ==="
puts controller.index[:body]

controller.params = { id: "1" }
puts "\\n=== SHOW ==="
puts controller.show[:body]

controller.params = { title: "New Post", body: "Content", author: "Alice" }
puts "\\n=== CREATE ==="
puts controller.create[:body]`,
            },
          ),
          callout("info", "Use `rails new api --api` to generate an API-only Rails app with minimal middleware and no views."),
        ],
        challenge: {
          title: "JSON API Endpoint",
          description: "Create an API controller that handles CRUD for a Product model. Implement index (returns all products), show (returns one by id), create (adds product), and destroy (removes product). All responses should be JSON.",
          starterCode: `require 'json'

# Implement a JSON API for products
class Product
  attr_accessor :id, :name, :price

  def initialize(id:, name:, price:)
    @id = id
    @name = name
    @price = price
  end

  def to_h
    { id: @id, name: @name, price: @price }
  end
end

class ProductsController
  attr_accessor :params

  def initialize
    @products = [
      Product.new(id: 1, name: "Laptop", price: 999),
      Product.new(id: 2, name: "Mouse", price: 29),
    ]
    @params = {}
  end

  def index
    # Return all products as JSON
  end

  def show
    # Return one product by id
  end

  def create
    # Add new product, return it
  end

  def destroy
    # Remove product by id
  end
end

controller = ProductsController.new
puts controller.index
controller.params = { id: 1 }
puts controller.show
controller.params = { name: "Keyboard", price: 79 }
puts controller.create
controller.params = { id: 1 }
puts controller.destroy`,
          solutionCode: `require 'json'

class Product
  attr_accessor :id, :name, :price

  def initialize(id:, name:, price:)
    @id = id
    @name = name
    @price = price
  end

  def to_h
    { id: @id, name: @name, price: @price }
  end
end

class ProductsController
  attr_accessor :params

  def initialize
    @products = [
      Product.new(id: 1, name: "Laptop", price: 999),
      Product.new(id: 2, name: "Mouse", price: 29),
    ]
    @params = {}
    @next_id = 3
  end

  def index
    JSON.generate({ products: @products.map(&:to_h), count: @products.size })
  end

  def show
    product = @products.find { |p| p.id == @params[:id] }
    return JSON.generate({ error: "Not found" }) unless product
    JSON.generate({ product: product.to_h })
  end

  def create
    product = Product.new(id: @next_id, name: @params[:name], price: @params[:price])
    @products << product
    @next_id += 1
    JSON.generate({ product: product.to_h })
  end

  def destroy
    @products.reject! { |p| p.id == @params[:id] }
    JSON.generate({ message: "Deleted" })
  end
end

controller = ProductsController.new
puts controller.index
controller.params = { id: 1 }
puts controller.show
controller.params = { name: "Keyboard", price: 79 }
puts controller.create
controller.params = { id: 1 }
puts controller.destroy`,
          tests: [
            { id: 1, label: "Returns JSON", keywords: [{ pattern: "JSON" }] },
            { id: 2, label: "Has index action", keywords: [{ pattern: "def index" }] },
            { id: 3, label: "Has create action", keywords: [{ pattern: "def create" }] },
          ],
        },
      },
      {
        id: "rails-11",
        title: "API Authentication (JWT)",
        xp: 16,
        theory: [
          text(
            "JSON Web Tokens (JWT) authenticate API requests. Unlike sessions, JWTs are stateless and can be validated by any service. The token is sent in the Authorization header.",
            {
              label: "JWT simulation",
              content: `require 'base64'
require 'json'

class SimpleJWT
  def self.encode(payload, secret)
    header = Base64.urlsafe_encode64({ typ: "JWT", alg: "HS256" }.to_json)
    payload_b64 = Base64.urlsafe_encode64(payload.to_json)
    signature = Base64.urlsafe_encode64("#{secret}:#{payload_b64}")
    "#{header}.#{payload_b64}.#{signature}"
  end

  def self.decode(token, secret)
    parts = token.split(".")
    return nil if parts.length != 3
    header, payload_b64, signature = parts
    expected = Base64.urlsafe_encode64("#{secret}:#{payload_b64}")
    return nil unless signature == expected
    JSON.parse(Base64.urlsafe_decode64(payload_b64))
  end
end

# Create token
payload = { user_id: 42, exp: Time.now.to_i + 3600 }
secret = "my_secret_key"
token = SimpleJWT.encode(payload, secret)
puts "Token: #{token[0..50]}..."

# Verify token
decoded = SimpleJWT.decode(token, secret)
puts "Decoded: #{decoded}"

# Tamper detection
tampered = token.sub("42", "99")
puts "Tampered: #{SimpleJWT.decode(tampered, secret).inspect}"`,
            },
          ),
          callout("tip", "In production, use the `jwt` gem and store secrets in environment variables, never in code."),
        ],
        challenge: {
          title: "Token-protected API",
          description: "Create an APIGateway class that accepts requests with a Bearer token, validates it, and returns either the requested data or an unauthorized error.",
          starterCode: `require 'json'

class SimpleJWT
  def self.encode(payload, secret)
    "#{secret}_#{payload.to_json}_#{secret}"
  end

  def self.decode(token, secret)
    parts = token.split("_")
    return nil unless parts[0] == secret && parts[2] == secret
    JSON.parse(parts[1])
  end
end

class APIGateway
  def initialize(secret)
    @secret = secret
    @data = { users: ["Alice", "Bob", "Charlie"] }
  end

  def handle_request(path:, auth_header: nil)
    # Check token, return data or error
  end
end

gateway = APIGateway.new("secret123")
puts gateway.handle_request(path: "/users")
puts gateway.handle_request(path: "/users", auth_header: "Bearer #{SimpleJWT.encode({user_id: 1}, 'secret123')}")`,
          solutionCode: `require 'json'

class SimpleJWT
  def self.encode(payload, secret)
    "#{secret}_#{payload.to_json}_#{secret}"
  end

  def self.decode(token, secret)
    parts = token.split("_")
    return nil unless parts[0] == secret && parts[2] == secret
    JSON.parse(parts[1])
  end
end

class APIGateway
  def initialize(secret)
    @secret = secret
    @data = { users: ["Alice", "Bob", "Charlie"] }
  end

  def handle_request(path:, auth_header: nil)
    token = auth_header&.sub("Bearer ", "")
    return { error: "Unauthorized", status: 401 } unless token

    payload = SimpleJWT.decode(token, @secret)
    return { error: "Invalid token", status: 401 } unless payload

    { data: @data, status: 200 }
  end
end

gateway = APIGateway.new("secret123")
puts gateway.handle_request(path: "/users")
puts gateway.handle_request(path: "/users", auth_header: "Bearer #{SimpleJWT.encode({user_id: 1}, 'secret123')}")`,
          tests: [
            { id: 1, label: "Validates token", keywords: [{ pattern: "decode" }] },
            { id: 2, label: "Returns unauthorized", keywords: [{ pattern: "401" }] },
            { id: 3, label: "Returns data on valid token", keywords: [{ pattern: "data" }] },
          ],
        },
      },
    ],
  },
  {
    id: "rails-deployment",
    title: "Deployment & Performance — Advanced",
    stage: "advanced",
    icon: "🚀",
    color: "#dc2626",
    lessons: [
      {
        id: "rails-12",
        title: "Production Setup & Environment",
        xp: 18,
        theory: [
          text(
            "Rails environments: development (local), test (CI), production (live). Use environment variables for secrets. Configure asset pipelines, caching, and logging per environment.",
            {
              label: "Environment configuration simulation",
              content: `# Simulating Rails-style environment configuration
class AppConfig
  class Configuration
    attr_accessor :cache_store, :log_level, :precompile_assets, :secret_key_base

    def initialize
      @cache_store = :memory_store
      @log_level = :info
      @precompile_assets = false
      @secret_key_base = nil
    end
  end

  class << self
    def environments
      @environments ||= {}
    end

    def configure(env)
      settings = Configuration.new
      yield(settings)
      environments[env] = settings
    end

    def env
      @current_env ||= :development
    end

    def env=(e)
      @current_env = e
    end

    def settings
      environments[env] || Configuration.new
    end
  end
end

# Configure environments
AppConfig.configure(:development) do |config|
  config.log_level = :debug
  config.precompile_assets = false
end

AppConfig.configure(:production) do |config|
  config.log_level = :warn
  config.precompile_assets = true
  config.cache_store = :redis_store
  config.secret_key_base = ENV["SECRET_KEY_BASE"] || "fallback_secret"
end

AppConfig.env = :production
puts "Cache: #{AppConfig.settings.cache_store}"
puts "Log: #{AppConfig.settings.log_level}"`,
            },
          ),
          callout("info", "Use `RAILS_ENV=production rails server` to run in production mode. Always set SECRET_KEY_BASE for production."),
        ],
        challenge: {
          title: "Environment Config",
          description: "Create a ConfigManager that loads environment-specific settings. It should have development (debug logging, localhost DB), production (warn logging, real DB URL from env), and test environments.",
          starterCode: `require 'ostruct'

# Implement environment-specific configuration
class ConfigManager
  def initialize
    @env = ENV['RAILS_ENV'] || 'development'
    @configs = {}
  end

  def configure(env, &block)
    # Store configuration for env
  end

  def current
    # Return current env config
  end

  def [](key)
    # Get config value
  end
end

manager = ConfigManager.new

manager.configure(:development) do |c|
  c.db_url = "postgres://localhost/myapp_dev"
  c.log_level = :debug
  c.secret = "dev_secret_123"
end

manager.configure(:production) do |c|
  c.db_url = ENV['DATABASE_URL']
  c.log_level = :warn
  c.secret = ENV['SECRET_KEY_BASE']
end

# Test
ENV['RAILS_ENV'] = 'production'
config = ConfigManager.new
puts "DB: #{config[:db_url]}"
puts "Log: #{config[:log_level]}"`,
          solutionCode: `require 'ostruct'

class ConfigManager
  def initialize
    @env = ENV['RAILS_ENV'] || 'development'
    @configs = {}
  end

  def configure(env, &block)
    config = OpenStruct.new
    yield(config)
    @configs[env] = config
  end

  def current
    @configs[@env.to_sym]
  end

  def [](key)
    current&.send(key)
  end
end

manager = ConfigManager.new

manager.configure(:development) do |c|
  c.db_url = "postgres://localhost/myapp_dev"
  c.log_level = :debug
  c.secret = "dev_secret_123"
end

manager.configure(:production) do |c|
  c.db_url = ENV.fetch('DATABASE_URL', 'postgres://prod/db')
  c.log_level = :warn
  c.secret = ENV.fetch('SECRET_KEY_BASE', 'missing')
end

manager.configure(:test) do |c|
  c.db_url = "postgres://localhost/myapp_test"
  c.log_level = :error
  c.secret = "test_secret"
end

ENV['RAILS_ENV'] = 'production'
config = ConfigManager.new
puts "DB: #{config[:db_url]}"
puts "Log: #{config[:log_level]}"`,
          tests: [
            { id: 1, label: "Configures environments", keywords: [{ pattern: "configure" }] },
            { id: 2, label: "Uses environment variables", keywords: [{ pattern: "ENV" }] },
            { id: 3, label: "Returns current config", keywords: [{ pattern: "current" }] },
          ],
        },
      },
      {
        id: "rails-13",
        title: "Caching & Performance",
        xp: 16,
        theory: [
          text(
            "Rails provides page, action, and fragment caching. Use `cache` helper in views. For more control, use ActiveSupport::Cache with Redis or Memcached stores.",
            {
              label: "Caching simulation",
              content: `# Simulating Rails caching
class CacheStore
  def initialize
    @store = {}
  end

  def fetch(key, expires_in: nil)
    if @store.key?(key)
      data = @store[key]
      if data[:expires_at] && Time.now > data[:expires_at]
        @store.delete(key)
      else
        return data[:value]
      end
    end
    value = yield
    @store[key] = {
      value: value,
      expires_at: expires_in ? Time.now + expires_in : nil
    }
    value
  end

  def read(key)
    return nil unless @store.key?(key)
    @store[key][:value]
  end

  def write(key, value, expires_in: nil)
    @store[key] = {
      value: value,
      expires_at: expires_in ? Time.now + expires_in : nil
    }
  end

  def delete(key)
    @store.delete(key)
  end

  def clear
    @store.clear
  end
end

cache = CacheStore.new

# First call - executes block
result1 = cache.fetch("articles") { ["Article 1", "Article 2"] }
puts "First call: #{result1}"

# Second call - from cache
result2 = cache.fetch("articles") { ["Should not run"] }
puts "Cached: #{result2}"

# With expiry
cache.write("temp", "data", expires_in: 0.01)
sleep 0.02
puts "Expired: #{cache.read("temp").inspect}"`,
            },
          ),
          callout("tip", "Use Russian Doll caching (nested fragment caches) for complex pages. Combine with `touch: true` on associations to auto-expire parent caches."),
        ],
        challenge: {
          title: "Cache with Sweeping",
          description: "Create a CacheManager with `fetch(key, &block)` that caches results, `expire(key)` to manually invalidate, and `expire_all` to clear everything. Also implement automatic expiry based on TTL.",
          starterCode: `# Implement a cache manager with TTL
class CacheManager
  def initialize
    @store = {}
  end

  def fetch(key, ttl: nil, &block)
    # Return cached if fresh, otherwise execute block and cache
  end

  def expire(key)
    # Remove specific key
  end

  def expire_all
    # Clear all cache
  end
end

cache = CacheManager.new

# First call
r1 = cache.fetch("user:1") { "Alice" }
puts "First: #{r1}"

# Second call (cached)
r2 = cache.fetch("user:1") { "Bob" }
puts "Cached: #{r2}"

# With TTL
r3 = cache.fetch("session", ttl: 0.01) { "session_data" }
sleep 0.02
r4 = cache.fetch("session") { "new_session" }
puts "TTL expired: #{r4}"`,
          solutionCode: `class CacheManager
  def initialize
    @store = {}
  end

  def fetch(key, ttl: nil, &block)
    entry = @store[key]
    if entry && (!entry[:expires_at] || Time.now < entry[:expires_at])
      return entry[:value]
    end
    value = block.call
    expires_at = ttl ? Time.now + ttl : nil
    @store[key] = { value: value, expires_at: expires_at }
    value
  end

  def expire(key)
    @store.delete(key)
  end

  def expire_all
    @store.clear
  end
end

cache = CacheManager.new

r1 = cache.fetch("user:1") { "Alice" }
puts "First: #{r1}"

r2 = cache.fetch("user:1") { "Bob" }
puts "Cached: #{r2}"

r3 = cache.fetch("session", ttl: 0.01) { "session_data" }
sleep 0.02
r4 = cache.fetch("session") { "new_session" }
puts "TTL expired: #{r4}"`,
          tests: [
            { id: 1, label: "Caches results", keywords: [{ pattern: "@store" }] },
            { id: 2, label: "Has expire method", keywords: [{ pattern: "def expire" }] },
            { id: 3, label: "Supports TTL", keywords: [{ pattern: "ttl" }] },
          ],
        },
      },
    ],
  },

  {
    id: "rails-advanced-patterns",
    title: "Advanced Rails Patterns — Advanced",
    stage: "advanced",
    icon: "⚙️",
    color: "#1d4ed8",
    lessons: [
      {
        id: "rails-14",
        title: "Background Jobs & Active Job",
        xp: 20,
        theory: [
          text(
            "Background jobs move slow tasks out of the request cycle. Rails Active Job provides a unified interface for job libraries like Sidekiq, Resque, or DelayedJob. Here we simulate a simple synchronous queue.",
            {
              label: "Job queue simulation",
              content: `# Simulating a simple Active-Job-style queue
class JobBase
  def self.perform_later(*args)
    puts "Job enqueued: #{self}"
    new.perform(*args)
  end

  def perform(*args)
    raise "Not implemented"
  end
end

class SendWelcomeEmailJob < JobBase
  def perform(user_email)
    puts "Sending email to #{user_email}..."
    puts "Email sent to #{user_email}!"
  end
end

class GenerateReportJob < JobBase
  def perform(report_id)
    puts "Generating report #{report_id}..."
    puts "Report #{report_id} ready!"
  end
end

SendWelcomeEmailJob.perform_later("alice@example.com")
GenerateReportJob.perform_later("report_42")`,
            },
          ),
          callout("info", "In production, use Sidekiq with Redis for reliable background job processing. It persists jobs in Redis and has a great web UI."),
        ],
        challenge: {
          title: "Job Queue System",
          description: "Create a SimpleJobQueue with `enqueue(job_class, *args)` that queues jobs, and `process_all` that runs all queued jobs. Jobs should be classes with a `perform(*args)` method.",
          starterCode: `# Implement a simple job queue
class SimpleJobQueue
  def initialize
    @jobs = []
  end

  def enqueue(job_class, *args)
    # Add job to queue
  end

  def process_all
    # Process all jobs in order
  end
end

class SendEmailJob
  def self.perform(recipient, subject)
    puts "Email sent: #{subject} to #{recipient}"
  end
end

class ProcessPaymentJob
  def self.perform(order_id, amount)
    puts "Payment processed: ##{order_id} - $#{amount}"
  end
end

queue = SimpleJobQueue.new
queue.enqueue(SendEmailJob, "alice@example.com", "Welcome!")
queue.enqueue(ProcessPaymentJob, "ORD-123", 99.99)
queue.process_all`,
          solutionCode: `class SimpleJobQueue
  def initialize
    @jobs = []
  end

  def enqueue(job_class, *args)
    @jobs << { class: job_class, args: args }
  end

  def process_all
    while @jobs.any?
      job = @jobs.shift
      job[:class].perform(*job[:args])
    end
  end
end

class SendEmailJob
  def self.perform(recipient, subject)
    puts "Email sent: #{subject} to #{recipient}"
  end
end

class ProcessPaymentJob
  def self.perform(order_id, amount)
    puts "Payment processed: ##{order_id} - $#{amount}"
  end
end

queue = SimpleJobQueue.new
queue.enqueue(SendEmailJob, "alice@example.com", "Welcome!")
queue.enqueue(ProcessPaymentJob, "ORD-123", 99.99)
queue.process_all`,
          tests: [
            { id: 1, label: "Has enqueue method", keywords: [{ pattern: "def enqueue" }] },
            { id: 2, label: "Processes jobs", keywords: [{ pattern: "perform" }] },
            { id: 3, label: "Stores job args", keywords: [{ pattern: "args" }] },
          ],
        },
      },
      {
        id: "rails-15",
        title: "Service Objects & DDD",
        xp: 18,
        theory: [
          text(
            "Service objects encapsulate complex business logic outside controllers and models. They follow Single Responsibility Principle and make code testable and reusable.",
            {
              label: "Service object pattern",
              content: `# Simulating Rails service objects
class ApplicationService
  def self.call(*args)
    new(*args).execute
  end
end

class OrderPlacementService < ApplicationService
  def initialize(order_data, user)
    @order_data = order_data
    @user = user
  end

  def execute
    return failure("No items") if @order_data[:items].empty?
    return failure("Invalid user") unless @user[:active]

    order = create_order
    charge_payment(order)
    send_confirmation(order)
    success(order)
  rescue => e
    failure(e.message)
  end

  private

  def create_order
    { id: rand(1000), user: @user[:email], items: @order_data[:items], total: 99.99 }
  end

  def charge_payment(order)
    puts "Charging card..."
  end

  def send_confirmation(order)
    puts "Email sent to #{order[:user]}"
  end

  def success(order)
    { success: true, order: order }
  end

  def failure(message)
    { success: false, error: message }
  end
end

# Use it
user = { email: "alice@example.com", active: true }
order_data = { items: [{ name: "Book", price: 20 }] }

result = OrderPlacementService.call(order_data, user)
puts result[:success] ? "Order ##{result[:order][:id]} placed!" : "Error: #{result[:error]}"`,
            },
          ),
          callout("tip", "Use service objects for operations involving multiple models or complex business rules. Keep controllers thin — they should only orchestrate, not contain business logic."),
        ],
        challenge: {
          title: "User Registration Service",
          description: "Create a RegisterUserService that handles the full registration flow: validates input, checks for existing email, hashes password, creates user, and sends welcome email. Return success or failure.",
          starterCode: `# Implement user registration service
class ApplicationService
  def self.call(*args)
    new(*args).execute
  end
end

class RegisterUserService < ApplicationService
  def initialize(params)
    @params = params
  end

  def execute
    # 1. Validate presence of name, email, password
    # 2. Check email uniqueness (simulate with existing_users array)
    # 3. Hash password (simple simulation)
    # 4. Create user
    # 5. Send welcome email (simulate)
    # Return success or failure
  end

  private

  def success(user)
    { success: true, user: user }
  end

  def failure(message)
    { success: false, error: message }
  end
end

# Test
result = RegisterUserService.call(name: "Alice", email: "alice@example.com", password: "secret123")
puts result[:success] ? "Registered: #{result[:user][:email]}" : "Error: #{result[:error]}"`,
          solutionCode: `class ApplicationService
  def self.call(*args)
    new(*args).execute
  end
end

class RegisterUserService < ApplicationService
  def initialize(params)
    @params = params
    @existing_users = ["bob@example.com"]
  end

  def execute
    return failure("Name is required") if @params[:name].nil? || @params[:name].strip.empty?
    return failure("Email is required") if @params[:email].nil? || @params[:email].strip.empty?
    return failure("Password is required") if @params[:password].nil? || @params[:password].length < 8
    return failure("Email already taken") if @existing_users.include?(@params[:email])

    password_hash = "hashed_#{@params[:password].reverse}"
    user = { name: @params[:name], email: @params[:email], password_hash: password_hash }
    send_welcome_email(user)
    success(user)
  end

  private

  def send_welcome_email(user)
    puts "Welcome email sent to #{user[:email]}"
  end

  def success(user)
    { success: true, user: user }
  end

  def failure(message)
    { success: false, error: message }
  end
end

result = RegisterUserService.call(name: "Alice", email: "alice@example.com", password: "secret123")
puts result[:success] ? "Registered: #{result[:user][:email]}" : "Error: #{result[:error]}"`,
          tests: [
            { id: 1, label: "Validates input", keywords: [{ pattern: "failure" }] },
            { id: 2, label: "Checks email uniqueness", keywords: [{ pattern: "existing" }] },
            { id: 3, label: "Creates user", keywords: [{ pattern: "user" }] },
          ],
        },
      },
    ],
  },
];

export const RUBY_ON_RAILS_LESSONS = RUBY_ON_RAILS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUBY_ON_RAILS_TOTAL_XP = RUBY_ON_RAILS_LESSONS.reduce((s, l) => s + l.xp, 0);