module EventSearchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model

    index_name "event_index_#{Rails.env}"

    settings do
      mappings dynamic: 'false' do
        indexes :id,    type: 'integer'
        indexes :title, type: 'text'
        indexes :body,  type: 'text'
        indexes :place, type: 'text'
        indexes :user, type: 'keyword'
        indexes :category, type: 'text'
      end
    end

    def as_indexed_json(*)
      attributes
        .symbolize_keys
        .slice(:id, :title, :body, :place)
        .merge(user: user_name, category: category_name)
    end
  end

  def user_name
    user.name
  end

  def category_name
    category.name
  end

  class_methods do
    def create_index!
      client = __elasticsearch__.client

      client.indices.delete index: self.index_name rescue nil

      client.indices.create(index: self.index_name,
                            body: {
                                settings: self.settings.to_hash,
                                mappings: self.mappings.to_hash
                            })
    end

    def search(keyword)
      __elasticsearch__.search({
        query: {
          multi_match: {
            # type: 'cross_fields',
            fields: %w(id title body place user category),
            query: keyword,
            fuzziness: 'AUTO',
            prefix_length: 2
          }
        }
      })
    end

    def search_by_datetime(datetime)
      # raise datetime.inspect
      __elasticsearch__.search({
        query: {
          range: {
            date: {
              lte: datetime,
            }
          }
        }
      })
    end
  end
end