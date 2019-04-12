require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require 'securerandom'
require 'rmagick'
require 'jwt'
require 'open-uri'

OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
OpenURI::Buffer.const_set 'StringMax', 0

Bundler.require(*Rails.groups)

module BadSns
  class Application < Rails::Application
    config.load_defaults 5.1
    config.api_only = true
    config.i18n.default_locale = :ja
    config.time_zone = 'Tokyo'
    config.middleware.use ActionDispatch::Cookies
  end
end
