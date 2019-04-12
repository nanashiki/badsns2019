Rails.application.routes.draw do

#               Prefix Verb   URI Pattern                            Controller#Action
#       clear_sessions DELETE /sessions(.:format)                    sessions#clear
#             sessions GET    /sessions(.:format)                    sessions#show
#                      POST   /sessions(.:format)                    sessions#create
#            icon_user GET    /users/:id/icon(.:format)              users#icon
#                users GET    /users(.:format)                       users#index
#                      POST   /users(.:format)                       users#create
# password_reset_index POST   /password_reset(.:format)              password_reset#create
#       password_reset PATCH  /password_reset/:reset_token(.:format) password_reset#update
#                      PUT    /password_reset/:reset_token(.:format) password_reset#update
#       search_friends GET    /friends/search(.:format)              friends#search
#              friends GET    /friends(.:format)                     friends#index
#                      POST   /friends(.:format)                     friends#create
#                icons POST   /icons(.:format)                       icons#create
#        find_new_feed GET    /feeds/:id/find_new(.:format)          feeds#find_new
#        find_old_feed GET    /feeds/:id/find_old(.:format)          feeds#find_old
#                feeds GET    /feeds(.:format)                       feeds#index
#                      POST   /feeds(.:format)                       feeds#create
#     open_graph_index GET    /open_graph(.:format)                  open_graph#index
#                             /404(.:format)                         errors#not_found
#                             /500(.:format)                         errors#internal_error

  resource :sessions, only: [:create, :show, :clear] do
    collection do
      delete '', to: "sessions#clear", as: 'clear'
    end
  end

  resources :users, only: [:index, :create, :icon] do
    member do
      get 'icon'
    end
  end

  resources :password_reset, only: [:create, :update], param: :reset_token do
  end

  resources :friends, only: [:index, :create, :search] do
    collection do
      get 'search'
    end
  end

  resources :icons, only: [:create] do
  end

  resources :feeds, only: [:index, :create, :find_new, :find_old] do
    member do
      get 'find_new'
      get 'find_old'
    end
  end

  resources :open_graph, only: [:index] do
  end

  match '404', to: 'errors#not_found', via: :all
  match '500', to: 'errors#internal_error', via: :all
end
