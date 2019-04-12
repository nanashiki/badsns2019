class OpenGraphController < ApplicationController
  def index
    # キャッシュを有効化
    expires_in 1.day
    open_graph = Rails.cache.fetch("/open_graph/#{params[:url]}", expired_in: 1.day) {
      # URLのページを解析してOpenGraph情報を抽出
      break unless page = open(params[:url]) rescue nil
      case page.content_type
        when 'text/html'
          # HTMLの場合はOGPタグから情報を抽出
          doc = Nokogiri::HTML.parse(page.read)
          url = doc.css('//meta[property="og:url"]/@content').first.to_s
          url = params[:url] if url.empty?
          title = doc.css('//meta[property="og:title"]/@content').first.to_s
          title = doc.title if title.empty?
          image_url = doc.css('//meta[property="og:image"]/@content').first.to_s
          image_data = Base64.strict_encode64(open(image_url).read) unless image_url.empty? rescue nil
        else
          # 画像の場合はそのまま表示
          url = params[:url]
          image_data = Base64.strict_encode64(page.read)
      end
      {url: url, title: title, image: image_data}
    }
    if open_graph.nil?
      render json: {errors: ['OpenGraph情報の取得に失敗しました']}, status: :bad_request and return
    end
    render json: open_graph and return
  end
end
