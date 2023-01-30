require 'rails_helper'

describe 'EventAPI' do
  it 'get all events' do
    FactoryBot.create_list(:event, 10)

    get '/api/v1/events'
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)

    expect(json['data'].length).to eq(10)
  end

  it 'get a event' do
    event = Event.create(title: 'test-title')

    get "/api/v1/events/#{event.id}"
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)

    expect(json['data']['title']).to eq(event.title)
  end

  it 'create a event' do
    valid_params = { title: 'title' }

    expect { event '/api/v1/events', params: { event: valid_params } }.to change(event, :count).by(+1)

    expect(response.status).to eq(200)
  end

  it 'edit a event' do
    event = Event.create(title: 'old-title')

    put "/api/v1/events/#{event.id}", params: { event: {title: 'new-title'}  }
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)

    expect(json['data']['title']).to eq('new-title')
  end

  it 'delete a event' do
    event = Event.create

    expect { delete "/api/v1/events/#{event.id}" }.to change(event, :count).by(-1)

    expect(response.status).to eq(200)
  end
end