class CreateQuestions < ActiveRecord::Migration
  def up
    create_table :questions do |t|
      t.text :title, limit: 65535, null: false
      t.text :content
      t.integer :user_id
      t.timestamps
    end
    add_index :questions, :title, length: { title: 200}
    add_index :questions, :user_id
  end

  def down
    if table_exists?(:questions)
      remove_index :questions, :title if index_exists? :questions, :title
      remove_index :questions, :user_id if index_exists? :questions, :user_id
      drop_table :questions
    end

  end
end
