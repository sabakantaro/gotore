require 'rails_helper'

describe 'EventAPI' do
  it 'get all events' do
    FactoryBot.create_list(:event, 10)

    get '/api/v1/events'
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
  end

  it 'get a event' do
    event = Event.create(title: 'test-title')

    get "/api/v1/events/#{event.id}"
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
  end

  it 'create a event' do
    valid_params = { title: 'title' }
    event = Event.create(title: 'test-title')
    post '/api/v1/events', params: { event: valid_params }

    expect(response.status).to eq(200)
  end

  it 'edit a event' do
    event = Event.create(title: 'old-title')

    put "/api/v1/events/#{event.id}", params: { event: {title: 'new-title'}  }
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
  end

  it 'delete a event' do
    event = Event.create
    delete "/api/v1/events/#{event.id}"

    expect(response.status).to eq(200)
  end
end