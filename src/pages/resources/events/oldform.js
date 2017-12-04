<form onSubmit={this.handleSubmit}>
                                        {this.state.Items.map((item, idx) => (
                                          <div className="food">
                                            <input
                                              type="text"
                                              placeholder={`Food #${idx + 1} name`}
                                              value={item.name}
                                              onChange={this.handleItemNameChange(idx)}
                                            />
                                            <button type="button" onClick={this.handleRemoveItem(idx)} className="small">-</button>
                                          </div>
                                        ))}
                                        <button type="button" onClick={this.handleAddItem} className="small">Add item</button>
                                        <button>Incorporate</button>
                                    </form>