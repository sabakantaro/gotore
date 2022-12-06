require 'rails_helper'

describe 'PostAPI' do
  it 'get all posts' do
    FactoryBot.create_list(:post, 10)

    get '/api/v1/posts'
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)

    expect(json['data'].length).to eq(10)
  end

  it 'get a post' do
    post = Post.create(title: 'test-title')

    get "/api/v1/posts/#{post.id}"
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)

    expect(json['data']['title']).to eq(post.title)
  end

  it 'create a post' do
    valid_params = { title: 'title' }

    expect { post '/api/v1/posts', params: { post: valid_params } }.to change(Post, :count).by(+1)

    expect(response.status).to eq(200)
  end

  it 'edit a post' do
    post = Post.create(title: 'old-title')

    put "/api/v1/posts/#{post.id}", params: { post: {title: 'new-title'}  }
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)

    expect(json['data']['title']).to eq('new-title')
  end

  it 'delete a post' do
    post = Post.create

    expect { delete "/api/v1/posts/#{post.id}" }.to change(Post, :count).by(-1)

    expect(response.status).to eq(200)
  end
end